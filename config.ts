import { IConfig } from "./models/configModel";

export const CONFIG:IConfig = {
    inputFile: 'data/germany_pois.osm.xml', //germany_pois.osm
    total: 1073564,
    poiDataFilename: 'attributes.csv',
    analysisResultFilename: 'analysisResultWithC.json',
    minCount: 10000,
    maxClusterSize: 10000,
    outFolder: 'out',
    combinationsFilename: 'combinationsWithC.ts',
    namesList: 'wordlists\\gods.txt',
    generatedNamesFilename: 'generatedNames.txt',
    clusterHelperBinary:'clusterFinder.exe',
    forceNames: true,
    forceClusterSize: true,
    maxThreads:15
}