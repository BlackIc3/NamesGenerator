import * as fs from 'fs';
import { exit, argv } from "process";
import { CONFIG } from "./config.js";
import { IAnalysisResult } from './models/analysisResultModel.js';
import { Analyst } from "./utils/analysing-util.js";
import { CombinationsHandler } from "./utils/combinations-handler.js";
import { Logger } from "./utils/logger.js";
import { NamesGenerator } from "./utils/names-generator.js";
import { Parser } from "./utils/parser.js";

/**
 * Parses the POI-data and analyses it, optionally printing the results 
 * @param silent whether not to output the current analysisResult to the console and to a file
 * @returns the result of the analysis
 */
async function analyse(silent = true) {
    const mapHandler = await Parser.parse(CONFIG.inputFile, CONFIG.total);
    const result = Analyst.analyse(mapHandler, CONFIG.minCount);
    if (!silent) Logger.outputAnalysisResult(result, `out${CONFIG.minCount}.txt`);
    return result;
}

/**
 * Parses the provided combinations, validates if enough names are provided and if so, generates the names
 * @param result the result to work with
 */
async function generateNames(result:IAnalysisResult) {
    const combinations = await CombinationsHandler.getCombinations();
    const nameGenerator = new NamesGenerator(result, combinations);
    nameGenerator.generateNames();
}

/**
 * Generates all needed key-value-pairs for a given analysis result. Writes the output to a file and exits if the file does not exist already
 * @param result the result analysis result to work with
 */
function generateCombinationsList(result:IAnalysisResult) {
    if (!fs.existsSync(CONFIG.outFolder + '/' + CONFIG.combinationsFilename)) {
        CombinationsHandler.generateCombinationsList(result);
        console.log('[+] Exiting now because a fresh list of combinations is most likely not sufficient...');
        exit(0);
    }
}

/**
 * Validates if the current combinations list is sufficient to generate unique names, exiting the program if that is not the case 
 */
async function validateCombinationsList() {
    if(!await CombinationsHandler.validateCombinationsList()) {
        if (!CONFIG.forceNames) {
            console.log('[!] Insufficient words found, exiting now...');
            exit(0);
        }
    }
}

async function main() {
    const result = await analyse();
    generateCombinationsList(result);
    await validateCombinationsList();
    await generateNames(result);
}

if (argv[2] === 'validate') {
    CombinationsHandler.validateCombinationsList().then((isValid) => {
        if (isValid) {
            console.log('[+] Combination list is valid!');
        } else {
            console.log('[!] Combination list is invalid!');
        }

    })
} else {
    main();
}