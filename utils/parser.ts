import * as XmlStream from 'xml-stream';
import * as fs from 'fs';
import * as ReadLine from 'readline';
import { PoiHandler } from '../models/PoiHandler.js';
import { Logger } from './logger.js';
import { CONFIG } from '../config.js';

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
                if (!tags.find((pair) => pair[0] === 'name')) handler.addPoi(element.$['id'], tags);
                total++;
            });

            xml.on('end', () => {
                clearInterval(interval);
                Logger.printDone(`[+] Loaded ${Logger.beautfiyNumber(handler.size)} of ${total} Pois in ${Logger.getTimeString(time)}!`);
                this.saveToCsv(handler);
                resolve(handler);
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
    private static saveToCsv(handler:PoiHandler) {
        Logger.printProgress('Saving parsed data to improve future loadup');
        const stream = fs.createWriteStream(this.defaultName, {flags:'a', encoding: 'utf-8'});

        handler.forEach((poi, id) => {
            for (const key in poi.tags) {
                stream.write([id, key, this.cleanEntry(poi.tags[key])].join(',') + '\n');
            }
        });

        stream.end();
        Logger.printDone(`[+] Saved data to '${this.defaultName}'!`);
    }

    private static cleanEntry(input:string):string {
        return input.replace(/\n|\r/gm, '').replace(/,/gm, ' ');
    }
}