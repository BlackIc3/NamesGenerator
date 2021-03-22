import * as fs from 'fs';
import { exit } from "process";
import { CONFIG } from "./config.js";
import { IAnalysisResult } from './models/analysisResultModel.js';
import { Analyst } from "./utils/analysing-util.js";
import { CombinationsHandler } from "./utils/combinations-handler.js";
import { Logger } from "./utils/logger.js";
import { NamesGenerator } from "./utils/names-generator.js";
import { Parser } from "./utils/parser.js";

/**
 * Parses the POI-data and analyses it, optionally printing the results 
 * @param silent whether to output the current analysisResult to the console and to a file
 * @returns the result of the analysis
 */
async function analyse(silent = true) {
    const mapHandler = await Parser.parse(CONFIG.inputFile, CONFIG.total);
    const result = Analyst.analyse(mapHandler, CONFIG.minCount);
    if (!silent) Logger.outputAnalysisResult(result, `out${CONFIG.minCount}.txt`);
    return result;
}

/**
 * If no combinations-file is given, it generates one and exits, otherwise parses the provided combinations, validates if enough names are provided and if so, generates the names
 * @param result the result to work with
 */
async function validateAndGenerate(result:IAnalysisResult) {
    if (!fs.existsSync(CONFIG.outFolder + '/' + CONFIG.combinationsFilename)) {
        CombinationsHandler.generateCombinationsList(result);
        console.log('[+] Generated \'' + CONFIG.combinationsFilename + '\'! Exiting now...');
        exit(1);
    }
    if(!await CombinationsHandler.validateCombinationsList()) {
        if (!CONFIG.forceNames) {
            console.log('[!] Insufficient words found, exiting now...');
            exit(0);
        }
    }

    const combinations = await CombinationsHandler.getCombinations();
    const nameGenerator = new NamesGenerator(result, combinations);
    nameGenerator.generateNames();
}

async function main() {
    const result = await analyse();
    await validateAndGenerate(result);
}

main();