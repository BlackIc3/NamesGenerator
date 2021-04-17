import { IAnalysisResult } from "../models/analysisResultModel";
import { plot, Plot } from 'nodeplotlib';
import { Color } from "plotly.js";
import { Poi } from "../models/poi";

export class Plotter {

    public static plotResult(result:IAnalysisResult) {
        const data: Plot[] = [
            this.mapToTrace(result.clusteredPois[1], "test", "#1F85DE"),
            this.mapToTrace(result.clusteredPois[2], "test", "#de581f"),
        ];
        plot(data)
    }

    private static mapToTrace(pois:Poi[], key:string, color:Color): Plot {
        return {
            type: 'scattergeo',
            lon: pois.map((p) => p.long),
            lat: pois.map((p) => p.lat),
            mode: 'markers',
            color: color,
            text: key
        } as Plot
    }
}