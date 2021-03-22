import * as fs from 'fs';
import { exit } from 'process';
import { CONFIG } from '../config';
import { IAnalysisResult } from '../models/analysisResultModel';
import { ICombination, IDescription } from '../models/combinationModel';
import { Logger } from './logger';

export class NamesGenerator {
    private result: IAnalysisResult;
    private combinations: ICombination[];
    private names: string[];

    private outFile:string;

    constructor(result: IAnalysisResult, combinations: ICombination[]) {
        if (!CONFIG.generatedNamesFilename) {
            console.log('[!] Please specify the generatedNames-Key in the config!');
            exit(0);
        }
        if (!fs.existsSync(CONFIG.namesList)) {
            console.log(`[!] Could not load nameslist '${CONFIG.namesList}', exiting now...`);
            exit(0);
        }

        this.names = fs.readFileSync(CONFIG.namesList, { encoding: 'utf-8' }).split('\n');
        this.result = result;
        this.combinations = [...combinations];
        this.outFile = CONFIG.outFolder + '/' + CONFIG.generatedNamesFilename;
    }

    public generateNames() {
        let count = 0;
        Logger.printProgress('Generating names', count, this.result.total);

        if (fs.existsSync(this.outFile)) fs.writeFileSync(this.outFile, '');
        const stream = fs.createWriteStream(this.outFile, {flags:'a', encoding: 'utf-8'});

        this.combinations.filter((element) => !!element.adjectives.length || !!element.descriptions.length).forEach((entry, index) => {
            const keyValueChain = entry.key.split(',');
            let current = this.result;
            keyValueChain.forEach((keyValue) => current = current.children.get(keyValue));
            this.generateCombinations(current.pois.map((poi) => poi.id), entry.adjectives, entry.descriptions, index, stream);

            count += entry.needed;
            Logger.printProgress('Generating names', count, this.result.total);
        });

        stream.end();
        Logger.printDone('[+] Wrote ' + Logger.beautfiyNumber(count) + ' names to \'' + CONFIG.generatedNamesFilename + '\'!');
    }

    private generateCombinations(ids: number[], adjectives: string[], descriptions: IDescription[], seed: number, stream:fs.WriteStream) {
        const permutations:string[] = [];
        if (!adjectives.length) {
            this.names.forEach((name) => {
                descriptions.forEach((description) => {
                    const generatedName = this.getNameString(name.trim(), description);
                    permutations.push(generatedName);
                })
            })
        } else {
            this.names.forEach((name) => {
                adjectives.forEach((adjective) => {
                    descriptions.forEach((description) => {
                        const generatedName = this.getNameString(name.trim(), description, adjective);
                        permutations.push(generatedName);
                    })
                })
            })
        }

        const rng = new SeededRng(seed);
        rng.shuffleArray(permutations);
        ids.forEach((id, index) => {
            stream.write([id, permutations[index % permutations.length]].join(',') + '\n');
            if (index % permutations.length === 0) rng.shuffleArray(permutations);
        });
    }

    private getNameString(name: string, description: IDescription, adjective?: string):string {
        const nameToUse = name.endsWith('s') ? name + "'" : name + 's';
        const adjectiveToUse = adjective + description.adjectiveEnding;
        
        if (!adjective) return nameToUse + ' ' + description.description;

        return nameToUse + ' ' + adjectiveToUse + ' ' + description.description;
    }
}

class SeededRng {
    private a = 21;
    private m = 200;
    private c = 37;
    private state: number;

    constructor(seed = 0) {
        this.state = seed;
    }

    public nextInt(): number {
        this.state = (this.a * this.state + this.c) % this.m;
        return this.state;
    }

    public nextRange(start: number, end: number): number {
        const rnd = this.nextInt() / this.m;
        return start + Math.floor((end - start) * rnd);
    }

    public shuffleArray(array: any[]) {
        const n = array.length;
        for (let i = 0; i < n - 1; i++) {
            const j = this.nextRange(i + 1, n);
            const tmp = array[i];
            array[i] = array[j];
            array[j] = tmp;
        }
    }
}