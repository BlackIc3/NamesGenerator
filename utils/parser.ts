import * as XmlStream from 'xml-stream';
import * as fs from 'fs';
import * as ReadLine from 'readline';
import { PoiHandler } from '../models/PoiHandler.js';
import { Logger } from './logger.js';
import { CONFIG } from '../config.js';
import { IAnalysisResult } from '../models/analysisResultModel.js';
import { IShallowAnalysisResult } from '../models/shallowAnalysisResultModel.js';

export class Parser {
    private static defaultName = CONFIG.outFolder + '/' + CONFIG.poiDataFilename;

    /**
     * Tries to load the POI-data from the '.csv' file, if not present from the given filename
     * @param filename the XML-File to parse
     * @param size the total amount of pois to parse
     * @returns a PoiHandler containing the parsed data
     */
    public static parse(filename?: string, size?:number): Promise<PoiHandler> {
        if (fs.existsSync(this.defaultName)) return this.parseCsv(this.defaultName);
        if (!fs.existsSync(filename)) throw new Error(`No file '${filename}' found!`);
        if (filename.endsWith('.xml')) return this.parseXml(filename, size);
        if (filename.endsWith('.csv')) return this.parseCsv(filename);
        throw new Error('Please specify either a .csv or .xml file!');
    }

    /**
     * Parses the given XML-file into a PoiHandler and saving the data as '.csv' for future loading improvement
     * @param filename the filename to parse
     * @param size the amount of pois
     * @returns a PoiHandler containing the parsed data
     */
    private static parseXml(filename:string, size?:number): Promise<PoiHandler> {
        return new Promise((resolve, reject) => {
            const xml = new XmlStream(fs.createReadStream(filename), 'utf-8');
            const handler = new PoiHandler();
            let total = 0;
            let time = 0, intervalSize = 1000;

            const interval = setInterval(() => {
                time += intervalSize / 1000;
                Logger.printProgress(`Parsing '${filename}'`, total, size);
            }, intervalSize);


            xml.collect('tag');
            xml.on('endElement: node', (element) => {
                const tags: string[][] = element.tag.map((entry) => [entry.$['k'], this.cleanEntry(entry.$['v'])]);
                if (!tags.find((pair) => pair[0] === 'name')) handler.addPoi(element.$['id'], element.$['lat'], element.$['lon'], tags);
                total++;
            });

            xml.on('end', () => {
                clearInterval(interval);
                Logger.printDone(`[+] Loaded ${Logger.beautfiyNumber(handler.size)} of ${Logger.beautfiyNumber(total)} Pois in ${Logger.getTimeString(time)}!`);
                this.saveToCsv(handler).then(() => resolve(handler));
            });
        });
    }

    /**
     * Parses the given '.csv' file into a PoiHandler
     * @param filename the path to the '.csv' file to parse
     * @returns a PoiHandler containing the parsed data
     */
    private static parseCsv(filename:string): Promise<PoiHandler> {
        return new Promise((resolve, reject) => {
            Logger.printProgress(`Parsing '${filename}'`);

            const handler = new PoiHandler();
            const readline = ReadLine.createInterface({
                input: fs.createReadStream(filename),
                crlfDelay: Infinity
            });

            readline.on('line', (line) => {
                const splits = line.split(',') //id, key, value
                handler.addKeyValuePair(Number(splits[0]), splits[1], splits[2]);
            });

            readline.on('close', () => {
                Logger.printDone(`[+] Loaded ${Logger.beautfiyNumber(handler.size)} Pois!`);
                resolve(handler);
            });
        });
    }

    /**
     * Saves the given PoiHandler to a '.csv' file
     * @param handler the handler to save
     */
    private static async saveToCsv(handler:PoiHandler):Promise<void> {
        return new Promise((resolve, reject) => {
            Logger.printProgress('Saving parsed data to improve future loadup');
            if (!fs.existsSync(CONFIG.outFolder)) fs.mkdirSync(CONFIG.outFolder);
            fs.writeFileSync(this.defaultName, '');
            
            const stream = fs.createWriteStream(this.defaultName, {flags:'a', encoding: 'utf-8'});
    
            handler.forEach((poi, id) => {
                stream.write([id, poi.lat, poi.long].join(',') + '\n');

                for (const key in poi.tags) {
                    stream.write([id, key, this.cleanEntry(poi.tags[key])].join(',') + '\n');
                }
            });
    
            stream.end(() => {
                Logger.printDone(`[+] Saved data to '${this.defaultName}'!`);
                resolve();
            });
            
        });
    }

    private static cleanEntry(input:string):string {
        return input.replace(/\n|\r/gm, '').replace(/,/gm, ' ');
    }

    public static parseRawClusters(filename:string):{id:number, cluster:number}[] {
        const lines = fs.readFileSync(filename, "utf-8").split('\r\n');
        lines.pop(); //remove newline at the end
        return lines.map((line) => { 
            const splits = line.split(',');
            return {id: +splits[0], cluster: +splits[1]}; 
        });
    }

    /**
     * Parses the string representation of a shallow analysis result at a given filepath into a analysis result
     * @param filename the filename to parse
     * @param handler the handler with all pois
     * @returns the parsed analysis result
     */
    public static parseAnalysisResult(filename:string, handler:PoiHandler): IAnalysisResult {
        Logger.printProgress('Parsing \'' + filename + '\'');
        try {
            const file = fs.readFileSync(filename, {encoding:'utf-8'});
            const shallowResult:IShallowAnalysisResult = JSON.parse(file);
            const result = this.parseShallowAnalysisResult(shallowResult, handler);
            Logger.printDone('[+] Succesfully parsed \'' + filename + '\'!')
            return result;
        } catch (e) {
            Logger.printDone('[!] An error occured when parsing \'' + filename + '\'!');
            return {total: -1, pois: [], clusteredPois: [], children: new Map<string, IAnalysisResult>()};
        }
    }

    /**
     * A helper function for parseAnalysisResult() to parse a shallow analysis result into a analysis result
     * @param shallowResult the shallow result to parse
     * @param handler the handler with all pois
     * @returns the parsed analysis result
     */
    private static parseShallowAnalysisResult(shallowResult:IShallowAnalysisResult, handler:PoiHandler):IAnalysisResult {
        const result:IAnalysisResult = {
            total: shallowResult.total,
            pois: shallowResult.pois.map((id) => handler.get(+id)),
            clusteredPois: shallowResult.clusteredPois.map((cluster) => cluster.map((id) => handler.get(+id))),
            children: new Map<string, IAnalysisResult>()
        }

        Object.entries(shallowResult.children).forEach(([key, child]) => result.children.set(key, this.parseShallowAnalysisResult(child, handler)));
        return result;
    }
}