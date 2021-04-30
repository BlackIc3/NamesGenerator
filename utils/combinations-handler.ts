import * as fs from 'fs';
import { exit } from 'process';
import { CONFIG } from '../config';
import { IAnalysisResult } from '../models/analysisResultModel';
import { ICombination } from '../models/combinationModel';
import { Logger } from './logger';

export class CombinationsHandler {
    private static outputFilename = CONFIG.outFolder + '/' + CONFIG.combinationsFilename;
    private static moduleFilename = '../' + CONFIG.outFolder + '/' + CONFIG.combinationsFilename.replace(/\..+/, '');

    private static namesList:string[];
    private static _combinations:ICombination[];

    /**
     * Generates a file to write all the needed combinations into
     * @param result the result to generate a combinations file for
     */
    public static generateCombinationsList(result:IAnalysisResult) {
        if (!this.namesList) this.initNamesList();

        Logger.printProgress(`Generating '${this.outputFilename}'`);

        this._combinations = this.flattenResult(result, [], []);
        Logger.outputCombinationsFile(this._combinations, this.outputFilename, this.namesList?.length);

        Logger.printDone(`[+] Generated '${this.outputFilename}'!`);
    }

    /**
     * A helperfunction for generateCombinationsList() to recursively flatten the given result-object into a list
     * @param result the sub-result to append
     * @param list the list to append to
     * @param prevKeys the (growing) list of previous keys
     * @param depth current recursion depth
     * @param maxDepth max recursion depth
     * @returns a list of all key combinations
     */
    private static flattenResult(result:IAnalysisResult, list:ICombination[], prevKeys:string[], depth = 0, maxDepth = 10): ICombination[] {
        if (depth >= maxDepth) return list;
        list.push({
            key: prevKeys.join(','),
            total: result.pois.length,
            biggestCluster: result.clusteredPois[0].length,     //the clusteredPois are always sorted by the cluster length (descending)
            clusters: result.clusteredPois.length,
            adjectives: [],
            descriptions: []
        });

        result.children.forEach((value, key) => this.flattenResult(value, list, [...prevKeys, key], depth + 1, maxDepth));
        return list;
    }


    /**
     * Validates if the current list of combinations can generate enough names to uniquely name each POI. 
     * Prints every combination where values are missing
     * @returns whether the current combinations list is valid
     */
    public static async validateCombinationsList(): Promise<boolean> {
        if (!this.namesList) this.initNamesList();
        if (!this._combinations) await this.initCombinations();

        const missing:{key:string, missing:number}[] = [];

        this._combinations.forEach((entry) => {
            const adjectivesLength = !entry.adjectives.length ? 1 : entry.adjectives.length;

            const total = adjectivesLength * entry.descriptions.length * this.namesList.length;
            if (total < entry.biggestCluster) missing.push({key:entry.key, missing:entry.biggestCluster - total});
        });

        const namesCount = !!this.namesList.length ? this.namesList.length : 1;
        let counter = 0;
        missing.forEach((entry) => {
            const approxSqrt = Math.ceil(Math.sqrt(entry.missing / namesCount));
            counter += 2 * approxSqrt;
            console.log(`[!] '${entry.key}': ${entry.missing} combinations missing! (${approxSqrt} * ${approxSqrt})`);
        });
        console.log(`[i] ${counter} combinations missing in total!`);

        return !missing.length;
    }

    /**
     * Initializes the internal list of names, parsing a list of default names if possible
     */
    private static initNamesList() {
        if (fs.existsSync(CONFIG.namesList)) {
            this.namesList = fs.readFileSync(CONFIG.namesList, {encoding: 'utf-8'}).split('\n');
        } else {
            this.namesList = [];
        }
    }

    /**
     * Initializes the internal combinations list, exiting if no file can be found
     */
    private static async initCombinations() {
        if (fs.existsSync(this.outputFilename)) {
            this._combinations = (await import(this.moduleFilename)).combinations;
        } else {
            console.log('[!] Failed to load \'' + this.outputFilename + '\'! Exiting now...');
            exit(0);
        }
    }

    /**
     * Returns a copy of the current combinations. If none set, it tries to initalize one, exiting if no file can be found
     * @returns a copy of the current combinations
     */
    public static async getCombinations():Promise<ICombination[]> { 
        if (!this._combinations) await this.initCombinations();
        return [...this._combinations];
     }
}