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

    /**
     * A Generator to create unique names for every POI in the given result
     * @param result the result to generate names for
     * @param combinations all combinations of the given result
     */
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

    /**
     * Generates a list containing all ids with their assigned name
     */
    public generateNames() {
        let count = 0;
        Logger.printProgress('Generating names', count, this.result.total);

        if (fs.existsSync(this.outFile)) fs.writeFileSync(this.outFile, '');
        const stream = fs.createWriteStream(this.outFile, {flags:'a', encoding: 'utf-8'});

        this.combinations.filter((element) => !!element.adjectives.length || !!element.descriptions.length).forEach((entry, index) => {
            const keyValueChain = !!entry.key.length ? entry.key.split(',') : [];
            let current = this.result;
            keyValueChain.forEach((keyValue) => current = current.children.get(keyValue));
            this.generateCombinations(current.pois.map((poi) => poi.id), entry.adjectives, entry.descriptions, index, stream);

            count += entry.needed;
            Logger.printProgress('Generating names', count, this.result.total);
        });

        stream.end(() => Logger.printDone('[+] Wrote ' + Logger.beautfiyNumber(count) + ' names to \'' + CONFIG.generatedNamesFilename + '\'!'));
    }

    /**
     * Generates all name-permutations for the given combination, shuffles them and assigns the names to ids, writing the output to the stream
     * @param ids the ids of the current cluster
     * @param adjectives the adjectives for the current combination
     * @param descriptions the descriptions of the current combination
     * @param seed the seed of the current combination
     * @param stream the stream to write to
     */
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

    /**
     * Transform the given parameters into a string with correct grammar
     * @param name the name to use
     * @param description the description to use
     * @param adjective the adjective to use
     * @returns a correct string representation of the POI-name
     */
    private getNameString(name: string, description: IDescription, adjective?: string):string {
        const nameToUse = name.endsWith('s') ? name + "'" : name + 's';
        const adjectiveToUse = adjective + description.adjectiveEnding;
        
        if (!adjective) return nameToUse + ' ' + description.description;

        return nameToUse + ' ' + adjectiveToUse + ' ' + description.description;
    }
}

class SeededRng {
    // With these parameters, the generator has a period of exactly 200, producing all numbers from 0-199 (inclusive) at a pseudo-random order
    // https://en.wikipedia.org/wiki/Linear_congruential_generator#c_%E2%89%A0_0
    private a = 21;
    private m = 200;
    private c = 37;
    private state: number;

    /**
     * A pseudo-random generator with a perdiod length of 200
     * @param seed the seed to start at
     */
    constructor(seed = 0) {
        this.state = seed;
    }

    /**
     * Returns a random integer
     * @returns the next random integer
     */
    public nextInt(): number {
        this.state = (this.a * this.state + this.c) % this.m;
        return this.state;
    }

    /**
     * Returns a random number in a given range
     * @param start start of the range
     * @param end end of the range (exclusive)
     * @returns a random number within the range
     */
    public nextRange(start: number, end: number): number {
        const rnd = this.nextInt() / this.m;
        return start + Math.floor((end - start) * rnd);
    }

    /**
     * Shuffles the given array in place using Sattolo's algorithm (https://danluu.com/sattolo/)
     * @param array the array to shuffle
     */
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