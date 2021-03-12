import { PoiHandler } from "../models/PoiHandler";
import { Logger } from "./logger";

interface IDistribution { byKey:boolean; entries:{}; }
enum KeyType { Maximal, MostEven }

export interface IAnalysisResult {
    total:number;
    pois:[number];
    children:Map<string, IAnalysisResult>;
}

export class Analyst {
    public static analyse(handler:PoiHandler, cutoff) {
        this.analyseRecursive(handler, cutoff);
    }

    private static getDistribution(handler:PoiHandler, key = ""):IDistribution {
        const distribution:IDistribution = { byKey:key.length === 0, entries:{} };
        if (distribution.byKey) {
            handler.forEach((poi, id) => {
                for (const pair of Object.entries(poi.tags)) {
                    const key = String(pair[0]);
                    if (typeof(distribution.entries[key]) !== 'object') distribution.entries[key] = [];
                    distribution.entries[key].push(id);
                }
            });
        } else {
            handler.forEach((poi, id) => {
                const value = poi.tags[key];
                if (typeof(distribution.entries[value]) !== 'object') distribution.entries[value] = [];
                distribution.entries[value].push(id);
            });
        }

        return distribution;
    }

    private static getKey(type: KeyType, distribution:IDistribution, total:number):string {
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

    private static getKeyFunction(type:KeyType):(count:number, favCount:number, total:number) => boolean {
        switch(type) {
            case KeyType.Maximal:
                return (count:number, favCount:number, total:number) => count > favCount;
            case KeyType.MostEven:
                return (count:number, favCount:number, total:number) => Math.abs((count / total) - 0.5) < Math.abs((favCount / total) - 0.5);
        }
    }

    private static splitHandlerByKey(distribution:IDistribution, handler:PoiHandler, key:string): {hasKey: PoiHandler, doesNotHaveKey:PoiHandler} {
        const hasKey = new PoiHandler();
        const doesNotHaveKey = handler.copy;
    
        distribution.entries[key].forEach((id:number) => {
            hasKey.set(id, handler.get(id).copy);
            doesNotHaveKey.delete(id);
        });

        return {hasKey: hasKey, doesNotHaveKey: doesNotHaveKey};
    }

    private static cleanKeys(handler:PoiHandler, key:string):PoiHandler {
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
     * @param maxDepth          max recursion depth
     * @param depth             current recursion depth
     * @param minSizeReduction  a factor determening by how much a split needs to reduce the current split size to be further analysed in order to avoid having many small splits  
     * @returns                 Map<string, IAnalysisResult>
     */
    private static analyseRecursive(handler:PoiHandler, cutoff:number, byKey = true, prevKey = "", maxIteration = 10, step = 0, maxDepth = 4, depth = 0, minSizeReduction = 0.2):Map<string, IAnalysisResult> {
        //  return if iterating to deep or if the split is to small to be analysed
        if (handler.size <= cutoff || step >= maxIteration || depth >= maxDepth) return;
        
        //  notify the user of the current iteration step
        const iterationProgress = step.toString().padStart(maxIteration.toString().length, ' ') + ' / ' + maxIteration.toString();
        Logger.printProgress(`Iteration step ${iterationProgress}`);

        // get the distribution of the current split, dividing either by "most common key" or "most common value" when a key is given
        const distribution = this.getDistribution(handler, !byKey ? prevKey : "");

        // determine the most common key/value of the current distribution
        const maxKey = this.getKey(KeyType.Maximal, distribution, handler.size);
        
        // split the current handler by the maxKey
        const split = this.splitHandlerByKey(distribution, handler, maxKey);
        
        // remove all POIs that have no other key left than the current
        const hasKeyNoTagLeft = !byKey ? this.cleanKeys(split.hasKey, prevKey) : new PoiHandler();
        const sizeReduction = split.hasKey.size / handler.size;

        // notify user about the current split        
        let numberString = Logger.beautfiyNumber(split.hasKey.size + hasKeyNoTagLeft.size);
        if (split.hasKey.size > cutoff && sizeReduction >= minSizeReduction && step < maxIteration - 1 && depth < maxDepth - 1) numberString = '[' + numberString + ']';
        Logger.printDone(`- '${maxKey}': ${numberString}`);

        Logger.goRight();

        // notify user about how many POIs are left that don't have any more keys
        if (hasKeyNoTagLeft.size && depth < maxDepth - 1) Logger.printDone(`- Without further tags: ${Logger.beautfiyNumber(hasKeyNoTagLeft.size)}`);

        // analyse the split of all POIs that contain the current key/key-value pair
        this.analyseRecursive(split.hasKey, cutoff, !byKey, byKey ? maxKey : prevKey, maxIteration, 0, maxDepth, depth + 1, minSizeReduction);
        Logger.goLeft();

        // FIXME return before analysing further if too little POIs left
        if (split.doesNotHaveKey.size <= cutoff || sizeReduction < minSizeReduction) {
            if (split.doesNotHaveKey.size) Logger.printDone(`- Remaining: ${Logger.beautfiyNumber(split.doesNotHaveKey.size)}`);
            return;
        }
        
        // analyse the split of all POIs that do not have the key/key-value pair
        this.analyseRecursive(split.doesNotHaveKey, cutoff, byKey, prevKey, maxIteration, step + 1, maxDepth, depth, minSizeReduction);
    }
}