import { Analyst } from "./utils/analysing-util.js";
import { Parser } from "./utils/parser.js";

async function main() {
    const mapHandler = await Parser.parse('data/germany_pois.osm.xml', 1073564);
    Analyst.analyse(mapHandler, 200);
}

main();