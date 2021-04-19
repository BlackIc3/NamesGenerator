import { IAnalysisResult } from "../models/analysisResultModel";
import { Layout, plot, Plot } from 'nodeplotlib';
import { Color } from "plotly.js";
import { Poi } from "../models/poi";
import { ICity } from "../models/cityModel";

export class Plotter {

    public static plotCities(cities: ICity[]) {
        const data: Plot[] = cities.map((city) => {
            return {
                type: 'scattergeo',
                lon: [city.long],
                lat: [city.lat],
                mode: 'markers',
                name: city.name,
            };
        })
        const layout: Layout = {
            title: cities.length + ' cities',
            width: 1500,
            height: 900,
        };
        plot(data, layout);
    }

    public static plotPoisPerCity(pois:Poi[], cities:ICity[], maxPois = 10) {
        const poisPerCity:{city:ICity, pois:Poi[]}[] = [];
        cities.forEach((city) => poisPerCity.push({city:city, pois:pois.filter((p) => p.city === city.id)}));
        
        const data: Plot[] = poisPerCity.map((entry) => {
            return {
                type: 'scattergeo',
                lon: entry.pois.slice(0, maxPois).map((p) => p.long),
                lat: entry.pois.slice(0, maxPois).map((p) => p.lat),
                mode: 'markers',
                name: entry.city.name,
            }
        })
        const layout: Layout = {
            title: cities.length + ' cities',
            width: 1500,
            height: 900,
        };
        plot(data, layout);
    }

    /**
     * Plots the given cluster data as a scatter plot. Calling this function  
     * will open up a new browser window with the interactive plot
     * @param cluster the cluster to plot
     * @param title the title to display for the plot
     */
    public static plotCluster(cluster: Poi[][], title?: string) {
        const data: Plot[] = [
            ...cluster.map((list, index) => this.mapToTrace(list, `Cluster #${index + 1}`, ''))
        ];
        const layout: Layout = {
            title: !!title ? title : "Cluster Data",
            width: 1500,
            height: 900,
        }
        plot(data, layout);
    }

    /**
     * Maps a list of POIs to a Plot-object
     * @param pois the pois to map
     * @param key the key to name the data
     * @param color the color to use for this cluster
     * @returns a Plot-object that can be plotted
     */
    private static mapToTrace(pois: Poi[], key: string, color?: Color): Plot {
        const plot: Plot = {
            type: 'scattergeo',
            lon: pois.map((p) => p.long),
            lat: pois.map((p) => p.lat),
            mode: 'markers',
            name: key,
        };

        if (!!color) plot["marker.color"] = color;

        return plot
    }
}