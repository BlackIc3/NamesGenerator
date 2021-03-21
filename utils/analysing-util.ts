import { Poi } from "../models/poi";
import { PoiHandler } from "../models/PoiHandler";
import { Logger } from "./logger";

interface IDistribution { byKey: boolean; entries: {}; }
enum KeyType { Maximal, MostEven }

export interface IAnalysisResult {
    total: number;
    pois: Poi[];
    children: Map<string, IAnalysisResult>;
}

export class Analyst {
    private static completed = 0;
    private static totalAmout = 0;

    public static analyse(handler: PoiHandler, cutoff: number): IAnalysisResult {
        this.completed = 0;
        this.totalAmout = handler.size;

        Logger.printProgress('Analyzing data', this.completed, this.totalAmout);
        const start = new Date().getTime();

        const emptyResult = { total: handler.size, pois: [], children: new Map<string, IAnalysisResult>() };
        const result =  this.analyseRecursive(handler, cutoff, emptyResult);
        
        const time = new Date().getTime() - start;
        Logger.printDone('[+] Analyzed ' + Logger.beautfiyNumber(handler.size) + ' POIs in ' + Math.round(time / 1000) + 's!');
        
        return result;
    }

    private static getDistribution(handler: PoiHandler, key = ""): IDistribution {
        const distribution: IDistribution = { byKey: key.length === 0, entries: {} };
        if (distribution.byKey) {
            handler.forEach((poi, id) => {
                for (const pair of Object.entries(poi.tags)) {
                    const key = String(pair[0]);
                    if (typeof (distribution.entries[key]) !== 'object') distribution.entries[key] = [];
                    distribution.entries[key].push(id);
                }
            });
        } else {
            handler.forEach((poi, id) => {
                const value = poi.tags[key];
                if (typeof (distribution.entries[value]) !== 'object') distribution.entries[value] = [];
                distribution.entries[value].push(id);
            });
        }

        return distribution;
    }

    private static getKey(type: KeyType, distribution: IDistribution, total: number): string {
        let favKey = Object.keys(distribution.entries)[0]
        let favCount = distribution.entries[favKey].length;
        const testFunction = this.getKeyFunction(type);

        for (const key in distribution.entries) {
            const count = distribution.entries[key].length;
            if (testFunction(count, favCount, total)) {
                favKey = key;
                favCount = count;

                if (count > Math.floor(total / 2)) break;
            }
        }
        return favKey;
    }

    private static getKeyFunction(type: KeyType): (count: number, favCount: number, total: number) => boolean {
        switch (type) {
            case KeyType.Maximal:
                return (count: number, favCount: number, total: number) => count > favCount;
            case KeyType.MostEven:
                return (count: number, favCount: number, total: number) => Math.abs((count / total) - 0.5) < Math.abs((favCount / total) - 0.5);
        }
    }

    private static splitHandlerByKey(distribution: IDistribution, handler: PoiHandler, key: string): { hasKey: PoiHandler, doesNotHaveKey: PoiHandler } {
        const hasKey = new PoiHandler();
        const doesNotHaveKey = handler.copy;

        distribution.entries[key].forEach((id: number) => {
            hasKey.set(id, handler.get(id).copy);
            doesNotHaveKey.delete(id);
        });

        return { hasKey: hasKey, doesNotHaveKey: doesNotHaveKey };
    }

    private static cleanKeys(handler: PoiHandler, key: string): PoiHandler {
        const noMoreTags = new PoiHandler();
        handler.forEach((poi, id) => {
            delete poi.tags[key];
            if (!Object.keys(poi.tags).length) noMoreTags.set(id, poi);
        });

        if (noMoreTags.size) {
            noMoreTags.forEach((poi, id) => handler.delete(id));
        }

        return noMoreTags;
    }

    /**
     * A function to analyze a given PoiHandler, determening 
     * 
     * @param handler           the PoiHandler to analyse
     * @param cutoff            the minimal amount of POIs needed for a category to be analysed further
     * @param byKey             whether the current iteration should search for the most common key or the most common value given a key
     * @param prevKey           the key of the previous iteration to search for the most common value by
     * @param maxIteration      maximal iteration depth 
     * @param step              current iteration step
     * @param maxDepth          max recursion depth, needs to be even for good results
     * @param depth             current recursion depth
     * @param minSizeReduction  a factor determening by how much a split needs to reduce the current split size to be further analysed in order to avoid having many small splits  
     * @returns                 AnalysisResult
     */
    private static analyseRecursive(handler: PoiHandler, cutoff: number, progress: IAnalysisResult, byKey = true, prevKey = "", maxIteration = 10, step = 0, maxDepth = 6, depth = 0, minSizeReduction = 0.2): IAnalysisResult {
        //  return if iterating to deep or if the split is to small to be analysed
        if (handler.size <= cutoff || step >= maxIteration || depth >= maxDepth) {
            const pois = [...handler.pois];
            pois.forEach((poi) => progress.pois.push(poi));

            this.completed = this.completed + pois.length * 0.5;
            Logger.printProgress('Analyzing data', this.completed, this.totalAmout);
            return progress;
        }

        this.completed = this.completed + progress.pois.length * 0.5;
        Logger.printProgress('Analyzing data', this.completed, this.totalAmout);

        // get the distribution of the current split, dividing either by "most common key" or "most common value" when a key is given
        const distribution = this.getDistribution(handler, !byKey ? prevKey : "");

        // determine the most common key/value of the current distribution
        const maxKey = this.getKey(KeyType.Maximal, distribution, handler.size);

        // split the current handler by the maxKey
        const split = this.splitHandlerByKey(distribution, handler, maxKey);

        // remove all POIs that have no other key left than the current
        const hasKeyNoTagLeft = !byKey ? this.cleanKeys(split.hasKey, prevKey) : new PoiHandler();
        const sizeReduction = split.hasKey.size / handler.size;

        const result: IAnalysisResult = { total: split.hasKey.size + hasKeyNoTagLeft.size, pois: hasKeyNoTagLeft.pois, children: new Map<string, IAnalysisResult>() };
        progress.children.set(maxKey, result);

        // analyse the split of all POIs that contain the current key/key-value pair
        this.analyseRecursive(split.hasKey, cutoff, result, !byKey, byKey ? maxKey : prevKey, maxIteration, 0, maxDepth, depth + 1, minSizeReduction);

        // FIXME return before analysing further if too little POIs left
        if (split.doesNotHaveKey.size <= cutoff || sizeReduction < minSizeReduction) {
            const pois = [...split.doesNotHaveKey.pois];
            pois.forEach((poi) => progress.pois.push(poi));
            
            this.completed = this.completed + pois.length;
            Logger.printProgress('Analyzing data', this.completed, this.totalAmout);
            return progress;
        }

        // analyse the split of all POIs that do not have the key/key-value pair
        this.analyseRecursive(split.doesNotHaveKey, cutoff, progress, byKey, prevKey, maxIteration, step + 1, maxDepth, depth, minSizeReduction);
        
        return progress;
    }
}