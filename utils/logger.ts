import { IAnalysisResult } from "./analysing-util";
import * as fs from 'fs';


export class Logger {
    private static longestMsg = 0;
    private static layer = 0;

    public static goRight() {this.layer += 1;}
    public static goLeft() { if(this.layer > 0) this.layer -= 1;}
    
    public static getTimeString(inputTime:number) :string {
        const seconds = inputTime % 60;
        const minutes = Math.floor(inputTime / 60) % 60;
        const hours = Math.floor(inputTime / 3600) % 24;
    
        return hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
    }

    public static beautfiyNumber(input:number): string {
        const arr = input.toString().split('');
        let ret = '';
        arr.reverse().forEach((digit, index) => {
            ret = digit + ret;
            if ((index + 1) % 3 === 0) ret = ' ' + ret;
        });

        return ret.trim();
    }

    public static printProgress(message:string, current = 0, max = 0, times = []) {
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
            outputString += "\t[" + Logger.getTimeString(remaining) + "] " + (avg / 1000).toFixed(3) + " s/Entry";
        }
    
        this.write(outputString.padEnd(this.longestMsg - 1, ' '));
    }
    
    public static printDone(message:string) {
        if (message.length > 100) message = message.substring(0, 96) + '...';
        this.write(message.padEnd(this.longestMsg - 1, ' ') + '\n');
    }

    public static outputAnalysisResult(result:IAnalysisResult, filename?:string) {
        const output = [];
        const cleanOutput = [];

        result.children.forEach((child, key) => {
            const header = '[i] ' + key + ' [' + Logger.beautfiyNumber(child.total) + ']' +'\n';
            const result = this.stringifyAnalysisResult(child, key);
            //if (child.pois.length) entries += '\n  - Remaining: ' + this.beautfiyNumber(child.pois.length);
            output.push(header + result);
            cleanOutput.push(...result.split('\n').map((line) => line.replace(/'  - '/gm, '')));
        });
        console.log(output.join('\n\n'));
        if (!!filename) {
            if (!fs.existsSync('out/')) fs.mkdirSync('out');
            fs.writeFileSync('out/' + filename, output.join('\n\n'));
        }
        return cleanOutput;
    }

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