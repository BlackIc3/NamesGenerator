import { Poi } from "./poi";

export interface IAnalysisResult {
    /**
     * The total amount of POIs in this cluster
     */
    total: number;
    /**
     * The Pois in the current cluster that cannot be clustered further
     */
    pois: Poi[];
    /**
     * The Pois in the current cluster that cannot be clustered further, clustered into 
     * subgroups to reduce the total amount of names that need to be generated for this cluster 
     */
    clusteredPois: Poi[][];
    /**
     * The sub-clusters of the current cluster
     */
    children: Map<string, IAnalysisResult>;
}