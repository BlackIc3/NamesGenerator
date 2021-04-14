import { CONFIG } from "../config";
import { Poi } from "../models/poi";

export class ClusterGenerator {

    /**
     * Clusters the given array of POIs dividing by latitude/longitude, 
     * returning an array containing arrays that are maximal the length given as 'maxClusterSize' in the config
     * @param pois the array of POIs to cluster
     * @returns the array of clusters
     */
    public static generateCluster(pois:Poi[]): Poi[][] {
        const result = this.divideClusterRecursive(pois);
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

        if (currentList.length < CONFIG.maxClusterSize || depth >= 10) {
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
}