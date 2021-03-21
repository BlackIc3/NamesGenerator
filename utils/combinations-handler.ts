import * as fs from 'fs';
import { exit } from 'process';
import { CONFIG } from '../config';
import { IAnalysisResult } from "./analysing-util";
import { Logger } from './logger';

export interface IEntry {
    key: string;
    needed: number;
    adjectives: string[];
    descriptions: IDescription[];
}

export interface IDescription {
    adjectiveEnding: string;
    description: string;
}

export class CombinationsHandler {
    private static outputFilename = CONFIG.outFolder + '/' + CONFIG.combinationsFilename;
    private static moduleFilename = '../' + CONFIG.outFolder + '/' + CONFIG.combinationsFilename.replace(/\..+/, '');

    private static namesList:string[];
    private static _combinations:IEntry[];

    public static generateCombinationsList(result:IAnalysisResult) {
        if (!this.namesList) this.initNamesList();

        Logger.printProgress(`Generating '${this.outputFilename}'`);

        this._combinations = this.flattenResult(result, [], []);
        Logger.outputCombinationsFile(this._combinations, this.outputFilename, this.namesList?.length);

        Logger.printDone(`[+] Generated '${this.outputFilename}'!`);
    }

    private static flattenResult(result:IAnalysisResult, list:IEntry[], prevKeys:string[], depth = 0, maxDepth = 10): IEntry[] {
        if (depth >= maxDepth) return list;
        list.push({
            key: prevKeys.join(','),
            needed: result.pois.length,
            adjectives: [],
            descriptions: []
        });

        result.children.forEach((value, key) => this.flattenResult(value, list, [...prevKeys, key], depth + 1, maxDepth));
        return list;
    }

    public static async validateCombinationsList(list?:string): Promise<boolean> {
        if (!this.namesList) this.initNamesList();
        if (!this._combinations) await this.initCombinations();

        const pathToUse = list || this.outputFilename;
        if (!fs.existsSync(pathToUse)) {
            console.log(`[!] Unable to load '${pathToUse}', exiting now...`);
            exit(0);
        }

        const missing:{key:string, missing:number}[] = [];

        this._combinations.forEach((entry) => {
            const adjectivesLength = !entry.adjectives.length ? 1 : entry.adjectives.length;

            const total = adjectivesLength * entry.descriptions.length * this.namesList.length;
            if (total < entry.needed) missing.push({key:entry.key, missing:entry.needed - total});
        });

        const namesCount = !!this.namesList.length ? this.namesList.length : 1;
        missing.forEach((entry) => {
            const approxSqrt = Math.ceil(Math.sqrt(entry.missing / namesCount));
            console.log(`[!] '${entry.key}': ${entry.missing} combinations missing! (${approxSqrt} * ${approxSqrt})`);
        });

        return !missing.length;
    }

    private static initNamesList() {
        if (fs.existsSync(CONFIG.namesList)) {
            this.namesList = fs.readFileSync(CONFIG.namesList, {encoding: 'utf-8'}).split('\n');
        } else {
            this.namesList = [];
        }
    }

    private static async initCombinations() {
        if (fs.existsSync(this.outputFilename)) {
            this._combinations = (await import(this.moduleFilename)).combinations;
        } else {
            console.log('[!] Failed to load \'' + this.outputFilename + '\'! Exiting now...');
            exit(0);
        }
    }

    public static async getCombinations():Promise<IEntry[]> { 
        if (!this._combinations) await this.initCombinations();
        return [...this._combinations];
     }
}