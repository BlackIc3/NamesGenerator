import * as fs from 'fs';
import { exit, argv } from "process";
import { CONFIG } from "./config.js";
import { IAnalysisResult } from './models/analysisResultModel.js';
import { Analyst } from "./utils/analysing-util.js";
import { CitiyUtils } from './utils/city-utils.js';
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
    const mapHandler = (await Parser.parse(CONFIG.inputFile, CONFIG.total)).nameless;

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

/**
 * Checks the integrity of the given AnalysisResult by searching for duplicate or missing IDs
 * (Very slow, only use for debug!)
 * @param result the AnalysisResult to verify
 * @param ids the list of POI-IDs that where parsed
 */
function verifyAnalysisResult(result: IAnalysisResult, ids: number[]) {
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
            Logger.printDone('[!] ' + msg);
        }
    }

    if (!!multiple) {
        Logger.printDone('[!] Invalid analysis result! Exiting now...');
        exit();
    }
}

/**
 * Transforms the given AnalysisResult into an array containing an entry for every group in the AnalysisResult
 * @param result the result to flatten
 * @param list an array of {key:string, ids:number[]} entrys, representing a subgroup of the analysis result
 * @param prevKeys the array of keys to append
 * @param depth the current recursion depth
 * @param maxDepth the maximal recursion depth
 * @returns an array of {key:string, ids:number[]} objects
 */
function flattenResult(result: IAnalysisResult, list: { key: string, ids: number[] }[], prevKeys: string[], depth = 0, maxDepth = 10): { key: string, ids: number[] }[] {
    if (depth >= maxDepth) return list;
    list.push({ key: prevKeys.join(','), ids: result.pois.map((p) => p.id) });

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
 * Analyses the given POI-Data, generates a list of all needed combinations and exists if no combinations list is provided.  
 * Otherwise parses the combination list and generates names for the analysed POIs
 */
async function main() {
    const result = await analyse();
    if (!CombinationsHandler.combinationListExists()) {
        CombinationsHandler.generateCombinationsList(result);
    } else {
        await CombinationsHandler.updateCombinationsList(result);
    }

    if (CONFIG.forceNames || await CombinationsHandler.validateCombinationsList()) {
        await generateNames(result);
    } else {
        Logger.prettyLog('[!] Insufficient words found, exiting now...');
        exit(0);
    }
}

/**
 * Analyses the given POI-Data and assigns a city to each POI.  
 * Afterwards saves the cities with their ids and the mapped POIs to two csv files and
 * plots the result. 
 */
async function generateCities() {
    const pois = await Parser.parse(CONFIG.inputFile, CONFIG.total);
    const [mappedPois, cities] = CitiyUtils.matchPoisToCities(pois.pois);

    Plotter.plotPoisPerCity(mappedPois, cities);
    Logger.outputCities(cities, 'out\\mappedCities.csv');
    Logger.outputPoisPerCity(mappedPois, 'out\\poisWithCityIDs.csv');
}

/**
 * Analyses the given POI-Data and plots the clusters of the given key-chain
 * @param key the comma seperated key-chain of the cluster to explore (e.g. "amenity,bench,backrest")
 */
async function plotCluster(key: string) {
    let groupToPlot = await analyse();

    key.split(',').forEach((value) => {
        if (!groupToPlot.children.has(value)) {
            Logger.prettyLog('[!] Key error at \'' + value + '\'! Exiting now...');
            exit(0);
        }
        groupToPlot = groupToPlot.children.get(value);
    });
    Plotter.plotCluster(groupToPlot.clusteredPois, Logger.beautifyNumber(groupToPlot.pois.length) + ': ' + key);
}


if (argv[2] === 'validate') {
    CombinationsHandler.validateCombinationsList()
    .then((isValid) => {
        const msg = isValid ? '[+] Combination list is valid!' : '[!] Combination list is invalid!';
        Logger.prettyLog(msg);
    });
} else if (argv[2] === 'cities') {
    generateCities();
} else if (argv[2] === 'plot') {
    if (argv.length > 3) plotCluster(argv[3]);
} else {
    main();
}