import { exit } from "process";
import { CONFIG } from "../config";
import { ICity } from "../models/cityModel";
import { Poi } from "../models/poi";
import { ClusterGenerator } from "./cluster-util";
import { Logger } from "./logger";
import { Parser } from "./parser";

export class CitiyUtils {

    public static matchPoisToCities(pois:Poi[]): [Poi[], ICity[]] {
        if (!CONFIG.citylistFilename) {
            console.log('[!] Please specify a city list in the Config to continue...')
            exit(0);
        }

        const cities = Parser.parseCities(CONFIG.citylistFilename);
        pois.forEach((p, index) => {
            const city = this.findClosestCity(p, cities);
            p.city = city.id;
            Logger.printProgress("Mapping " + Logger.beautfiyNumber(cities.length) + " cities to " + Logger.beautfiyNumber(pois.length) + " Pois", index + 1, pois.length);
        });

        Logger.printDone("[+] Succesfully mapped " + Logger.beautfiyNumber(cities.length) + " cities to " + Logger.beautfiyNumber(pois.length) + " Pois!");

        return [pois, cities];
    }

    private static findClosestCity(p:Poi, cities:ICity[]):ICity {
        let closest = cities[0];
        let closestDist = ClusterGenerator.distance(p, closest);
        for (const city of cities) {
            const distance = ClusterGenerator.distance(p, city); 
            if (distance < closestDist) {
                closest = city;
                closestDist = distance; 
            }
        }
        return closest;
    }
}