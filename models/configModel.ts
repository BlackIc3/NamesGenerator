export interface IConfig {
    /**
     * The XML-file containing the OpenMaps Data
     */
    inputFile:string;
    /**
     * The total amount of POIs, only needed for better logging
     */
    total?:number;
    /**
     * The name of the file for quick-load
     */
    poiDataFilename:string;
    /**
     * The minimal cutoff of POIs needed for a cluster to explored further when analysing the data
     */
    minCount:number;
    /**
     * The maxmial size of a subcluster within a key/value cluster
     */
    maxClusterSize:number;
    /**
     * The foldername where to put all output-files
     */
    outFolder:string;
    /**
     * The name of the file for the combinations
     */
    combinationsFilename:string;
    /**
     * The path to the list of default names
     */
    namesList?:string;
    /**
     * The name of the file to write the generated names to
     */
    generatedNamesFilename?:string;
    /**
     * Force the generator to generate names even if there are insufficient names for some groups leading to name collisions
     */
    forceNames?:boolean;
}