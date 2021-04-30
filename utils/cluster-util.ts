import * as fs from 'fs';
import { spawn } from "child_process";
import { CONFIG } from "../config";
import { Poi } from "../models/poi";
import { Logger } from "./logger";
import { Parser } from "./parser";
import { ICity } from '../models/cityModel';

export class ClusterGenerator {

    private static threadID = 0;
    private static runningThreads = 0;

    /**
     * Clusters the given list of POIs using DBSCAN and returns the result  
     * If the given array is greater than 100 000, the data will be divided  
     * recursively by latitude/longitude until the unique arrays are small enough
     * @param pois the POIs to cluster
     * @returns a promise that resolves to an array consisting of the clusters
     */
    public static async clusterPois(pois: Poi[]): Promise<Poi[][]> {
        const splits = this.divideClusterRecursive(pois, 0, 100000);
        const result:Poi[][] = [];
        for (const split of splits) {
            const clusters = await this.startThread(split);
            result.push(...clusters);
        }
        return result;
    }

    /**
     * Starts a new thread to cluster the given POIs
     * @param pois the POIs to cluster
     * @returns a promies that resolves to the mapped POIs
     */
    private static startThread(pois: Poi[]): Promise<Poi[][]> {
        const epsilon = 0.1;
        const minPois = 3;
        if (this.runningThreads >= CONFIG.maxThreads) {
            return new Promise((resolve, reject) => {
                const interval = setInterval(() => {
                    if (this.runningThreads < CONFIG.maxThreads) {
                        clearInterval(interval);
                        resolve(this.runClusterHelper(pois, epsilon, minPois));
                    }
                }, 500);
            });
        }
        return this.runClusterHelper(pois, epsilon, minPois);
    }

    /**
     * Invokes the cluster-helper binary to cluster the given POIs with the given parameters
     * @param pois the POIs to cluster
     * @param epsilon the minimal distance between the POIs to be considered neighbors
     * @param minPois the minimum amount of POIs to be considered a cluster
     * @returns a promise that resolves to the mapped POIs
     */
    private static runClusterHelper(pois: Poi[], epsilon: number, minPois: number): Promise<Poi[][]> {
        return new Promise(async (resolve, reject) => {
            this.threadID++;
            this.runningThreads++;

            const inFile = 'utils\\clusterHelper\\tmp\\clusterThread' + this.threadID + '-In.csv';
            const outFile = 'utils\\clusterHelper\\tmp\\clusterThread' + this.threadID + '-Out.csv';

            Logger.outputClusterData(pois, inFile);
            const args = [
                inFile,
                pois.length.toString(),
                outFile,
                epsilon.toString(),
                minPois.toString()
            ];

            const runner = spawn('utils\\clusterHelper\\' + CONFIG.clusterHelperBinary, args);
            runner.stdout.on("data", data => {
                //console.log(data.toString());
            });

            runner.stderr.on("data", data => {
                this.runningThreads--;
                reject(`stderr: ${data}`);
            });

            runner.on('error', (error) => {
                this.runningThreads--;
                reject(`error: ${error.message}`);
            });

            runner.on("close", code => {
                this.runningThreads--;
                if (code !== 0) {
                    console.log('Arguments: ' + args.join(' '));
                    reject('Bad Exit Code: ' + code);
                } else {
                    const mappedClusters: Poi[][] = this.mapClusters(outFile, pois); 
                    if (CONFIG.forceClusterSize) {
                        mappedClusters.forEach((value, index, array) => {
                            if (value.length > CONFIG.maxClusterSize) {
                                const splits = this.divideClusterRecursive(value);
                                array.splice(index, 1);
                                array.push(...splits);
                            }
                        })
                    }
                    mappedClusters.sort((a, b) => b.length - a.length);

                    fs.unlinkSync(inFile);
                    fs.unlinkSync(outFile);
                    resolve(mappedClusters); 
                }
            });
        })
    }

    /**
     * Maps the output of the clusterFinder to the existing POIs, returning the found clusters
     * @param filename the filename to parse
     * @param pois the pois to map
     * @returns an array with the clusters
     */
    private static mapClusters(filename:string, pois:Poi[]): Poi[][] {
        const rawData:{id:number; cluster:number}[] = Parser.parseRawClusters(filename);
        const poisObj:{[key:number]:Poi} = {};
        pois.forEach((p) => poisObj[p.id] = p);

        let maxID = 0;
        rawData.forEach((data) => {
            if (data.cluster > maxID) maxID = data.cluster;
            if (!!poisObj[data.id]) poisObj[data.id].clusterLabel = data.cluster
        });

        return this.mapPoisToClusters(pois, maxID);
    }

    /**
     * Clusters the given array of POIs dividing by latitude/longitude, 
     * returning an array containing arrays that are maximal the length given as 'maxClusterSize' in the config
     * @param pois the array of POIs to cluster
     * @param forceMaxClusterSize if true, splits clusters larger than the maxClusterSize further
     * @returns the array of clusters
     */
    public static generateCluster(pois: Poi[]): Poi[][] {
        const result = this.dbscan(pois, 0.05, 3);
        if (CONFIG.forceClusterSize) {
            result.forEach((value, index, array) => {
                if (value.length > CONFIG.maxClusterSize) {
                    const splits = this.divideClusterRecursive(value);
                    array.splice(index, 1);
                    array.push(...splits);
                }
            })
        }
        result.sort((a, b) => b.length - a.length);
        return result;
    }

    /**
     * A recursive helper function to divide an array into smaller subclusters
     * @param currentList the list of POIs in the current recursion-step
     * @param depth current recursion depth
     * @returns the list of clusters
     */
    private static divideClusterRecursive(currentList: Poi[], depth: number = 0, minSize = CONFIG.maxClusterSize): Poi[][] {
        const result: Poi[][] = [];

        if (currentList.length <= minSize || depth >= 10) {
            result.push(currentList);
            return result;
        }

        const splits = this.splitCluster(currentList, depth % 2 === 0);
        const resultSplitA = this.divideClusterRecursive(splits[0], depth + 1);
        const resultSplitB = this.divideClusterRecursive(splits[1], depth + 1);

        result.push(...resultSplitA);
        result.push(...resultSplitB);

        return result;
    }

    /**
     * Splits a given list of POIs by sorting it either by latitude or longitude and dividing it in half
     * @param list the list to split
     * @param byLat if true, sorts the list by latitude, otherwise by longitude
     * @returns the two splits
     */
    private static splitCluster(list: Poi[], byLat: boolean): [Poi[], Poi[]] {
        if (byLat) {
            list.sort((a, b) => a.lat - b.lat);
        } else {
            list.sort((a, b) => a.long - b.long);
        }
        return [list.slice(0, Math.floor(list.length / 2)), list.slice(Math.floor(list.length / 2))];
    }

    /**
     * A typescript implementation of the DBSCAN - clustering algorithm, built to cluster points in a 2D plane by coordinates  
     * Further reading: https://en.wikipedia.org/wiki/DBSCAN
     * @param pois the pois to cluster
     * @param epsilon the minimum distance between two pois to be considered neighbors (in lat/long)
     * @param minPoints the minimum amount of neighbors a poi has to have to be considered a cluster
     * @returns the clustered pois
     */
    private static dbscan(pois: Poi[], epsilon: number, minPoints: number): Poi[][] {
        let progress = 0;

        let clusterID = 0;
        for (const p of pois) {
            Logger.printProgress('Clustering ' + Logger.beautfiyNumber(pois.length) + ' pois', progress, pois.length);

            if (p.clusterLabel > -1) continue;                              //skip p if already assigned
            const neighbors_p = this.getNeighbors(p, pois, epsilon);        //get neighbors of p
            if (neighbors_p.length < minPoints) {                           //mark p as noise and continue if p has insufficient neighbors
                p.clusterLabel = 0;
                continue;
            }

            clusterID++;                                                    //increment current clusterID 
            p.clusterLabel = clusterID;                                     //set clusterlabel of p to the current cluster 

            progress++;

            const poisToExpand = neighbors_p.filter((e) => e.id != p.id);   //determine the POIs to expand further
            for (const q of poisToExpand) {
                if (q.clusterLabel == 0) q.clusterLabel = clusterID;        //if point q is neighbor of p and labeled as 'Noise', add it to the cluster
                if (q.clusterLabel > -1) continue;                          //if the point q is already processed (meaning its label is Noise or a clusterID), skip q
                q.clusterLabel = clusterID;                                 //if the point q is not already in a cluster, add it to the cluster around p

                progress++;
                Logger.printProgress('Clustering ' + Logger.beautfiyNumber(pois.length) + ' pois', progress, pois.length);

                const neighbors_q = this.getNeighbors(q, pois, epsilon);    //find neighbors of q
                if (neighbors_q.length >= minPoints) {
                    poisToExpand.push(...neighbors_q);                      //append neighbors of q to the poisToExpand, if q is a core-point
                }
            }
        }

        return this.mapPoisToClusters(pois, clusterID);
    }

    /**
     * Gets a subset of pois, containing all neighbors of p
     * @param p the poi to find neighbors for
     * @param pois the list of all pois
     * @param epsilon the minimum distance between to pois to be considered neighbors
     * @returns the list of neighbors
     */
    private static getNeighbors(p: Poi, pois: Poi[], epsilon: number): Poi[] {
        const neighbors: Poi[] = [];
        for (const q of pois) {
            if (this.distance(p, q) <= epsilon) {
                neighbors.push(q);
            }
        }
        return neighbors;
    }

    /**
     * Calculates the distance between two pois or cities
     * @param a poi or city a
     * @param b poi or city b
     * @returns the distance between the two pois
     */
    public static distance(a: Poi | ICity, b: Poi | ICity): number {
        return Math.sqrt(Math.pow(a.lat - b.lat, 2) + Math.pow(a.long - b.long, 2))
    }

    /**
     * A helper function to split the list of all pois by its clusterIDs
     * @param pois the list of pois
     * @param maxClusterID the highest cluster id
     * @returns the list of pois, split into the clusters given the cluster ids of the pois
     */
    private static mapPoisToClusters(pois: Poi[], maxClusterID: number): Poi[][] {
        if (!pois.length) return [[]];
        const clusteredPois: Poi[][] = [];
        for (let i = -1; i <= maxClusterID; i++) {
            const cluster = pois.filter((p) => p.clusterLabel == i);
            if (!!cluster.length) clusteredPois.push(cluster);
        }

        return clusteredPois;
    }

    /**
     * Returns a promise that resolves once all threads stopped
     * @returns Promise<void>s 
     */
    public static isFinished():Promise<void> {
        return new Promise((resolve, reject) => {
            const interval = setInterval(() => {
                if (this.runningThreads === 0) {
                    clearInterval(interval);
                    resolve();
                }
                Logger.printProgress('Waiting for ' + this.runningThreads.toString().padStart(2, ' ') + ' thread(s) to finish');
            }, 500 )
        })
    }
}