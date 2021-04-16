import { CONFIG } from "../config";
import { Poi } from "../models/poi";
import { Logger } from "./logger";

export class ClusterGenerator {

    /**
     * Clusters the given array of POIs dividing by latitude/longitude, 
     * returning an array containing arrays that are maximal the length given as 'maxClusterSize' in the config
     * @param pois the array of POIs to cluster
     * @param forceMaxClusterSize if true, splits clusters larger than the maxClusterSize further
     * @returns the array of clusters
     */
    public static generateCluster(pois:Poi[], forceMaxClusterSize?:boolean): Poi[][] {
        if (pois.some((p) => p.clusterLabel != -1)) console.log('WTF');
        const result = this.dbscan(pois, 0.05, 3);
        if (forceMaxClusterSize) {
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
    private static divideClusterRecursive(currentList:Poi[], depth:number = 0): Poi[][] {
        const result:Poi[][] = [];

        if (currentList.length <= CONFIG.maxClusterSize || depth >= 10) {
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
    private static splitCluster(list:Poi[], byLat:boolean): [Poi[], Poi[]] {
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
    private static dbscan(pois:Poi[], epsilon:number, minPoints:number): Poi[][] {
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
    private static getNeighbors(p:Poi, pois:Poi[], epsilon:number): Poi[] {
        const neighbors:Poi[] = [];
        for (const q of pois) {
            if (this.distance(p, q) <= epsilon) {
                neighbors.push(q);
            }
        }
        return neighbors;
    }

    /**
     * Calculates the distance between two pois
     * @param a poi a
     * @param b poi b
     * @returns the distance between the two pois
     */
    private static distance(a:Poi, b:Poi): number {
        return Math.sqrt(Math.pow(a.lat - b.lat, 2) + Math.pow(a.long - b.long, 2))
    }

    /**
     * A helper function to split the list of all pois by its clusterIDs
     * @param pois the list of pois
     * @param maxClusterID the highest cluster id
     * @returns the list of pois, split into the clusters given the cluster ids of the pois
     */
    private static mapPoisToClusters(pois:Poi[], maxClusterID:number): Poi[][] {
        if (!pois.length) return [[]];
        const clusteredPois:Poi[][] = [];
        for (let i = -1; i <= maxClusterID; i++) {
            const cluster = pois.filter((p) => p.clusterLabel == i);
            if (!!cluster.length) clusteredPois.push(cluster);
        }

        return clusteredPois;
    }
}