import { IConfig } from "./models/configModel";

export const CONFIG:IConfig = {
    inputFile: 'data/germany_pois.osm.xml',
    total: 1073564,
    poiDataFilename: 'attributes.csv',
    analysisResultFilename: 'analysisResult.json',
    minCount: 10,
    maxClusterSize: 10000,
    outFolder: 'out',
    combinationsFilename: 'combinations.ts',
    namesList: 'wordlists\\gods.txt',
    generatedNamesFilename: 'generatedNames.txt',
    forceNames: false
}