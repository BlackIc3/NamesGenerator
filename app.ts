import * as fs from 'fs';
import { exit } from "process";
import { CONFIG } from "./config.js";
import { Analyst, IAnalysisResult } from "./utils/analysing-util.js";
import { CombinationsHandler } from "./utils/combinations-handler.js";
import { Logger } from "./utils/logger.js";
import { NamesGenerator } from "./utils/names-generator.js";
import { Parser } from "./utils/parser.js";

async function analyse() {
    const mapHandler = await Parser.parse(CONFIG.inputFile, CONFIG.total);
    const result = Analyst.analyse(mapHandler, CONFIG.minCount);
    //Logger.outputAnalysisResult(result, `out${CONFIG.minCount}.txt`);
    return result;
}

async function validateAndGenerate(result:IAnalysisResult, force = false) {
    if (!fs.existsSync(CONFIG.outFolder + '/' + CONFIG.combinationsFilename)) {
        CombinationsHandler.generateCombinationsList(result);
        console.log('[+] Generated \'' + CONFIG.combinationsFilename + '\'!');
    }
    if(!await CombinationsHandler.validateCombinationsList()) {
        if (!force) {
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
    await validateAndGenerate(result, true);
}

main();