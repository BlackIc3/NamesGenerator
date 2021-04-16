import { IConfig } from "./models/configModel";

export const CONFIG:IConfig = {
    inputFile: 'data/test.xml', //germany_pois.osm
    total: 1073564,
    poiDataFilename: 'attributesTest.csv',
    analysisResultFilename: 'analysisResultTest.json',
    minCount: 10,
    maxClusterSize: 10000,
    outFolder: 'out',
    combinationsFilename: 'combinationsTest.ts',
    namesList: 'wordlists\\gods.txt',
    generatedNamesFilename: 'generatedNames.txt',
    forceNames: false
}