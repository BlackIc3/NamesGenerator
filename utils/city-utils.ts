import { exit } from "process";
import { CONFIG } from "../config";
import { ICity } from "../models/cityModel";
import { Poi } from "../models/poi";
import { ClusterGenerator } from "./cluster-util";
import { Logger } from "./logger";
import { Parser } from "./parser";

export class CitiyUtils {

    /**
     * Parses the provided list of cities and assigns each POI the cityID of the closest city
     * @param pois the pois to match
     * @returns a tuple with the list of pois as first entry and the list of cities as second entry
     */
    public static matchPoisToCities(pois:Poi[]): [Poi[], ICity[]] {
        if (!CONFIG.citylistFilename) {
            Logger.prettyLog('[!] Please specify a city list in the Config to continue...')
            exit(0);
        }

        const cities = Parser.parseCities(CONFIG.citylistFilename);
        pois.forEach((p, index) => {
            const city = this.findClosestCity(p, cities);
            p.city = city.id;
            Logger.printProgress("Mapping " + Logger.beautifyNumber(cities.length) + " cities to " + Logger.beautifyNumber(pois.length) + " Pois", index + 1, pois.length);
        });

        Logger.printDone("[+] Succesfully mapped " + Logger.beautifyNumber(cities.length) + " cities to " + Logger.beautifyNumber(pois.length) + " Pois!");

        return [pois, cities];
    }

    /**
     * A helperfunction for matchPoisToCities() to find the closest city for a given POI
     * @param p the POI to find the closest city for
     * @param cities the list of cities
     * @returns the closest city to the POI
     */
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