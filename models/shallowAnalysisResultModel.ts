export interface IShallowAnalysisResult {
    /**
     * The total amount of POIs in this cluster
     */
    total: number;
    /**
     * The PoiIDs in the current cluster that cannot be clustered further
     */
    pois: number[];
    /**
     * The PoiIDs in the current cluster that cannot be clustered further, clustered into 
     * subgroups to reduce the total amount of names that need to be generated for this cluster 
     */
    clusteredPois: number[][];
    /**
     * The sub-clusters of the current cluster
     */
    children: { [key: string]: IShallowAnalysisResult };
}