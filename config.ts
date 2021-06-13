import { IConfig } from "./models/configModel";

export const CONFIG:IConfig = {
    inputFile: 'data/germany_pois.osm.xml', 
    citylistFilename: 'data/cities.csv',
    total: 1115132,
    poiDataFilename: 'attributes.csv', //allPoisNoKeys.csv
    analysisResultFilename: 'analysisResult.json',
    minCount: 10000,
    maxClusterSize: 10000,
    outFolder: 'out',
    combinationsFilename: 'combinations.ts',
    namesList: 'wordlists\\gods.txt',
    generatedNamesFilename: 'generatedNames.csv',
    clusterHelperBinary:'clusterFinder.exe',
    forceNames: false,
    forceClusterSize: true,
    maxThreads:15
}