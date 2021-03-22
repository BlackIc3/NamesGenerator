import * as fs from 'fs';
import { CONFIG } from "../config";
import { IAnalysisResult } from '../models/analysisResultModel';
import { ICombination } from '../models/combinationModel';


export class Logger {
    private static longestMsg = 0; //the length of the longest message so far
    private static layer = 0; //the depth of the curser

    /**
     * Move the cursor the the right
     */
    public static goRight() {this.layer += 1;}

    /**
     * Move the cursor the the left
     */
    public static goLeft() { if(this.layer > 0) this.layer -= 1;}
    
    /**
     * Returns a nice string representation of the given time
     * @param inputTime the time in seconds
     * @returns the given time as a string
     */
    public static getTimeString(inputTime:number) :string {
        const seconds = inputTime % 60;
        const minutes = Math.floor(inputTime / 60) % 60;
        const hours = Math.floor(inputTime / 3600) % 24;
    
        return hours.toString().padStart(2, '0') + 'h ' + minutes.toString().padStart(2, '0') + 'm ' + seconds.toString().padStart(2, '0') + 's';
    }

    /**
     * Returns a nice string representation of the given number
     * @param input a (presumable big) number
     * @returns the given number as a string
     */
    public static beautfiyNumber(input:number): string {
        const arr = input.toString().split('');
        let ret = '';
        arr.reverse().forEach((digit, index) => {
            ret = digit + ret;
            if ((index + 1) % 3 === 0) ret = ' ' + ret;
        });

        return ret.trim();
    }

    /**
     * Prompts the given message as '[*] message... [==           ] 13% [00h 01m 25s] 1.221s/Entry'
     * The progressbar and the time information are optional depending on whethter the respective parameters are set
     * Should be closed with a 'printDone()' call
     * @param message the message to prompt
     * @param current current iteration
     * @param max max iterations
     * @param times an array containing ms/iteration entries
     */
    public static printProgress(message:string, current = 0, max = 0, times:number[] = []) {
        if (message.length > 100) message = message.substring(0, 96);
        let outputString = '[*] ' + message + '...';
    
        if (max != 0) {
            const maxBars = 20;
            const percentage = current / max;
            const barCount = Math.floor(maxBars * percentage);
            outputString += ':  [' + ''.padStart(barCount, '=').padEnd(maxBars, ' ') + '] ' + Math.round(percentage * 100).toString().padStart(3, " ") + "%";
        }
    
        if (times.length) {
            const avg = times.reduce((p, c) => p + c) / times.length;
            const remaining = Math.round((avg * (max - current)) / 1000);
            outputString += "\t[" + Logger.getTimeString(remaining) + "] " + (avg / 1000).toFixed(3) + "s/Entry";
        }
    
        this.write(outputString.padEnd(this.longestMsg - 1, ' '));
    }
    
    /**
     * Prompts the given message, usually to close a 'printProgress()' call
     * @param message the message to prompt
     */
    public static printDone(message:string) {
        if (message.length > 100) message = message.substring(0, 96) + '...';
        this.write(message.padEnd(this.longestMsg - 1, ' ') + '\n');
    }

    /**
     * Writes a string representation of the given combinations list to the given destination file
     * @param combinations the list of combinations to be stringyfied
     * @param destination the path of the file to write to
     * @param namesListLength the length of the default names list to calculate the amount of missing combinations
     */
    public static outputCombinationsFile(combinations:ICombination[], destination:string, namesListLength = 1) {
        if (namesListLength === 0) namesListLength = 1;
        
        const sortedList = [...combinations];
        sortedList.sort((a, b) => b.needed - a.needed);
        
        const header = 'import { ICombination } from "../utils/combinations-handler";\n\nexport const combinations: ICombination[] = [';
        const lines = [header];

        sortedList.forEach((entry) => {
            const approxSqrt = Math.ceil(Math.sqrt(entry.needed / namesListLength));
            lines.push('\t{');
            lines.push(`\t\t// ${approxSqrt} * ${approxSqrt}`);
            lines.push(Object.entries(entry).map(([key, value]) => '\t\t' + key + ': ' + this.getCorrectString(value)).join(',\n'));
            lines.push('\t},');
        });

        lines.push('];');
        fs.writeFileSync(destination, lines.join('\n'));
    }

    private static getCorrectString(input: any): string {
        switch (typeof input) {
            case 'string':
                return "'" + input + "'";
            case 'number':
                return input.toString();
            case 'object':
                return '[]';
        }
    }

    /**
     * Writes a string representation of the given analysis result to the given filepath
     * @param result the result-obj to be stringyfied
     * @param filename the filename to write to
     */
    public static outputAnalysisResult(result:IAnalysisResult, filename?:string) {
        const output = [];

        result.children.forEach((child, key) => {
            const header = '[i] ' + key + ' [' + Logger.beautfiyNumber(child.total) + ']' +'\n';
            const result = this.stringifyAnalysisResult(child, key);
            output.push(header + result);
        });

        if (result.pois.length) output.push('[i] Not groupable: ' + this.beautfiyNumber(result.pois.length));

        console.log(output.join('\n\n'));
        if (!!filename) {
            if (!fs.existsSync(CONFIG.outFolder + '/')) fs.mkdirSync(CONFIG.outFolder);
            fs.writeFileSync(CONFIG.outFolder + '/' + filename, output.join('\n\n'));
        }
    }

    /**
     * A helper function for outputAnalysisResult() to flatten a given sub-result 
     * @param result the current sub-result to append
     * @param key the (growing) key for the full combination
     * @param isKey if the current result is handled by key (e.g. 'amenity') or by value (e.g. 'bench')
     * @param output the (growing) current line
     * @returns a flattenend representation of the given analysis result
     */
    private static stringifyAnalysisResult(result:IAnalysisResult, key:string, isKey = true, output = '  - '): string {
        if (!isKey) {
            output += '.' + key;
            if (result.children.size) output += ' && ';
        } else {
            output += key;
        }

        if (!result.children.size) {
            output += ': ' + this.beautfiyNumber(result.pois.length);
            return output;
        }

        const lines = [];
        if (result.pois.length) lines.push(`${output.replace(/ && $/, '')}: ${this.beautfiyNumber(result.pois.length)}`);
        result.children.forEach((child, currentKey) => lines.push(this.stringifyAnalysisResult(child, currentKey, !isKey, output)));
        return lines.join('\n');
    }

    private static write(text:string) {
        if (text.length > this.longestMsg) this.longestMsg = text.length + 1;
        process.stdout.write('\r' + ' '.repeat(this.layer * 4) + text);
    }
}