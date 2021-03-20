import { Analyst } from "./utils/analysing-util.js";
import { Logger } from "./utils/logger.js";
import { Parser } from "./utils/parser.js";

const inputFile = 'data/germany_pois.osm.xml';
const total = 1073564;

const minCount = 10000;


async function main() {
    const mapHandler = await Parser.parse(inputFile, total);
    const result = Analyst.analyse(mapHandler, minCount);
    const flattenedList = Logger.outputAnalysisResult(result, `out${minCount}.txt`);
}

main();