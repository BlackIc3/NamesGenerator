import * as fs from 'fs';
import { exit } from 'process';
import { CONFIG } from '../config';
import { IAnalysisResult } from '../models/analysisResultModel';
import { ICombination } from '../models/combinationModel';
import { Logger } from './logger';

export class CombinationsHandler {
    private static outputFilename = CONFIG.outFolder + '/' + CONFIG.combinationsFilename;
    private static moduleFilename = '../' + CONFIG.outFolder + '/' + CONFIG.combinationsFilename.replace(/\..+/, '');

    private static namesList: string[];
    private static _combinations: ICombination[];

    /**
     * Generates a file to write all the needed combinations into
     * @param result the result to generate a combinations file for
     */
    public static generateCombinationsList(result: IAnalysisResult) {
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
    private static flattenResult(result: IAnalysisResult, list: ICombination[], prevKeys: string[], depth = 0, maxDepth = 10): ICombination[] {
        if (depth >= maxDepth) return list;
        list.push({
            key: prevKeys.join(','),
            total: result.pois.length,
            approxEntries: Math.ceil(Math.sqrt(result.clusteredPois[0].length / this.namesList.length)),
            biggestCluster: result.clusteredPois[0].length,     //the clusteredPois are always sorted by the cluster length (descending)
            clusters: result.clusteredPois.length,
            adjectives: [],
            descriptions: []
        });

        result.children.forEach((value, key) => this.flattenResult(value, list, [...prevKeys, key], depth + 1, maxDepth));
        return list;
    }

    /**
     * Returns an obj of the given list of ICombinations, where the key of  
     * each combination is also its key in the obj 
     * @param list The list of `ICombination` objects
     * @returns The obj with the combinations as values
     */
    private static listToObj(list: ICombination[]): { [key: string]: ICombination } {
        const obj = {};
        list.forEach((e) => obj[e.key] = e);
        return obj;
    }

    /**
     * Returns a list of the values of the given obj 
     * @param obj The `ICombination` object to turn into a list
     * @returns The list with the obj values
     */
    private static objToList(obj: { [key: string]: ICombination }): ICombination[] {
        return [...Object.values(obj)];
    }

    /**
     * Compares the already existing combinations file to the new analysis result,  
     * updating the current if there are any changes
     * @param result The new analysis result
     */
    public static async updateCombinationsList(result: IAnalysisResult): Promise<void> {
        if (!this.namesList) this.initNamesList();
        const newResult = this.listToObj(this.flattenResult(result, [], []));
        const current = this.listToObj(await this.getCombinations());

        const keysNew:ICombination[] = [];
        const keysUpdated:ICombination[] = [];
        const keysUnneeded = await this.getCombinations();

        for (const key of Object.keys(newResult)) {
            if (!current[key]) {
                //key does not exist in current combinations
                current[key] = newResult[key];
                keysNew.push(newResult[key]);
            } else if (current[key].approxEntries !== newResult[key].approxEntries) {
                //update current key
                current[key].total = newResult[key].total;
                current[key].approxEntries = newResult[key].approxEntries;
                current[key].clusters = newResult[key].clusters;
                current[key].biggestCluster = newResult[key].biggestCluster;
                keysUpdated.push(newResult[key]);
            }

            const index = keysUnneeded.findIndex((value) => value.key === key);
            if (index !== -1) keysUnneeded.splice(index, 1);
        }

        this._combinations = this.objToList(current);
        Logger.printCombinationsUpdates(keysNew, keysUpdated, keysUnneeded);
        Logger.outputCombinationsFile(this._combinations, this.outputFilename, this.namesList?.length);
    }

    /**
     * Validates if the current list of combinations can generate enough names to uniquely name each POI. 
     * Prints every combination where values are missing
     * @returns whether the current combinations list is valid
     */
    public static async validateCombinationsList(): Promise<boolean> {
        if (!this.namesList) this.initNamesList();
        if (!this._combinations) await this.initCombinations();

        const missing: { key: string, totalMissing: number, entriesMissing: number }[] = [];

        this._combinations.forEach((entry) => {
            const adjectivesLength = !entry.adjectives.length ? 1 : entry.adjectives.length;

            const total = adjectivesLength * entry.descriptions.length * this.namesList.length;
            if (total < entry.biggestCluster) {
                const totalMissing = entry.biggestCluster - total;
                const entriesMissing = entry.approxEntries - Math.min(adjectivesLength, entry.descriptions.length);
                missing.push({ key: entry.key, totalMissing: totalMissing, entriesMissing: entriesMissing });
            }
        });

        let counter = 0;
        missing.forEach((entry) => {
            counter += 2 * entry.entriesMissing;
            Logger.prettyLog(`[!] '${entry.key}': ${entry.totalMissing} combinations missing! (${entry.entriesMissing} * ${entry.entriesMissing})`);
        });
        Logger.prettyLog(`[i] ${counter} combinations missing in total!`);

        return !missing.length;
    }

    /**
     * Initializes the internal list of names, parsing a list of default names if possible
     */
    private static initNamesList() {
        if (fs.existsSync(CONFIG.namesList)) {
            this.namesList = fs.readFileSync(CONFIG.namesList, { encoding: 'utf-8' }).split('\n');
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
            Logger.prettyLog('[!] Failed to load \'' + this.outputFilename + '\'! Exiting now...');
            exit(0);
        }
    }

    /**
     * Returns a copy of the current combinations. If none set, it tries to initalize one, exiting if no file can be found
     * @returns a copy of the current combinations
     */
    public static async getCombinations(): Promise<ICombination[]> {
        if (!this._combinations) await this.initCombinations();
        return [...this._combinations];
    }

    /**
     * Checks if a combination file already exists at the configured filepath
     * @returns whether a combinations list exists
     */
    public static combinationListExists(): Boolean {
        return fs.existsSync(this.outputFilename);
    }

}