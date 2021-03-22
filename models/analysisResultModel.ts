import { Poi } from "./poi";

export interface IAnalysisResult {
    /**
     * The total amount of POIs in this cluster
     */
    total: number;
    /**
     * The Pois in current cluster that cannot be clustered further
     */
    pois: Poi[];
    /**
     * The sub-clusters of the current cluster
     */
    children: Map<string, IAnalysisResult>;
}