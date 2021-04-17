import * as fs from 'fs';
import { exit, argv } from "process";
import { CONFIG } from "./config.js";
import { IAnalysisResult } from './models/analysisResultModel.js';
import { Analyst } from "./utils/analysing-util.js";
import { CombinationsHandler } from "./utils/combinations-handler.js";
import { Logger } from "./utils/logger.js";
import { NamesGenerator } from "./utils/names-generator.js";
import { Parser } from "./utils/parser.js";
import { Plotter } from './utils/plotting-util.js';

if (!fs.existsSync('utils\\clusterHelper\\tmp')) fs.mkdirSync('utils\\clusterHelper\\tmp');

/**
 * Parses the POI-data and analyses it, optionally printing the results  
 * Saves the analysisResult to the filename specified in the config
 * @param silent whether not to output the current analysisResult to the console and to a file
 * @returns the result of the analysis
 */
async function analyse(silent = true) {
    const pathToAnalysisResult = CONFIG.outFolder + '/' + CONFIG.analysisResultFilename;
    const mapHandler = await Parser.parse(CONFIG.inputFile, CONFIG.total);

    if (fs.existsSync(pathToAnalysisResult)) {
        const parsedResult = Parser.parseAnalysisResult(pathToAnalysisResult, mapHandler);
        return parsedResult;
    }

    const result = await Analyst.analyse(mapHandler, CONFIG.minCount);
    if (!!CONFIG.verifyAnalysisResult) verifyAnalysisResult(result, mapHandler.pois.map((p) => p.id));
    if (!silent) Logger.printAnalysisResult(result, `out${CONFIG.minCount}.txt`);
    Logger.saveAnalysisResult(result);
    return result;
}

function verifyAnalysisResult(result:IAnalysisResult, ids:number[]) {
    const flatResult = flattenResult(result, [], []);
    let multiple = 0;
    let i = 0;
    for (const id of ids) {
        Logger.printProgress('Verifying result', i, ids.length);
        i++;
        const occurences = flatResult.filter((l) => l.ids.includes(id));
        if (occurences.length != 1) {
            multiple++;
            const msg = !occurences.length ? 'Missing id \'' + id + '!' : 'Duplicate id \'' + id + '\': ' + occurences.map((o) => o.key).join(' | ');
            console.log('[!] ' + msg);
        }
    }

    if (!!multiple) {
        console.log('[!] Invalid analysis result! Exiting now...');
        exit();
    }
}

function flattenResult(result:IAnalysisResult, list:{key:string, ids:number[]}[], prevKeys:string[], depth = 0, maxDepth = 10): {key:string, ids:number[]}[] {
    if (depth >= maxDepth) return list;
    list.push({key:prevKeys.join(','), ids:result.pois.map((p) => p.id)});

    result.children.forEach((value, key) => flattenResult(value, list, [...prevKeys, key], depth + 1, maxDepth));
    return list;
}

/**
 * Parses the provided combinations, validates if enough names are provided and if so, generates the names
 * @param result the result to work with
 */
async function generateNames(result: IAnalysisResult) {
    const combinations = await CombinationsHandler.getCombinations();
    const nameGenerator = new NamesGenerator(result, combinations);
    nameGenerator.generateNames();
}

/**
 * Generates all needed key-value-pairs for a given analysis result. Writes the output to a file and exits if the file does not exist already
 * @param result the result analysis result to work with
 */
function generateCombinationsList(result: IAnalysisResult) {
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
    if (!await CombinationsHandler.validateCombinationsList()) {
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

async function plot() {
    const result = await analyse();
    Plotter.plotResult(result);
}

if (argv[2] === 'validate') {
    CombinationsHandler.validateCombinationsList().then((isValid) => {
        if (isValid) {
            console.log('[+] Combination list is valid!');
        } else {
            console.log('[!] Combination list is invalid!');
        }

    })
} else if(argv[2] === 'cities') {
    plot();
} else {
    main();
}