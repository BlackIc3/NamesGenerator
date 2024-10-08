import { IConfig } from "./models/configModel";

export const CONFIG:IConfig = {
    inputFile: 'data/germany_pois.osm.xml', //germany_pois.osm
    citylistFilename: 'data/cities.csv',
    total: 1115132,
    poiDataFilename: 'attributes.csv',
    analysisResultFilename: 'analysisResult.json',
    minCount: 10000,
    maxClusterSize: 10000,
    outFolder: 'out',
    combinationsFilename: 'combinations.ts',
    namesList: 'wordlists\\gods.txt',
    generatedNamesFilename: 'generatedNames.csv',
    clusterHelperBinary:'clusterFinder.exe',
    forceNames: true,
    forceClusterSize: true,
    maxThreads:15
}