import { Poi } from "./poi";

export class PoiHandler {
    private _map: Map<number, Poi>;

    /**
     * A wrapper object around a map of POIs
     * @param map the map of the PoiHandler. If none given, a new one will be generated
     */
    constructor(map?:Map<number, Poi>) {
        this._map = !!map ? map : new Map<number, Poi>();
    }

    /**
     * Adds a POI with the given id and tags to the map
     * @param id the id of the POI
     * @param tags the tags of the POI as string arrays (e.g. [['amenity', 'bench'], ['backrest', 'yes']])
     */
    public addPoi(id: number, tags?: string[][]) {
        this._map.set(id, new Poi(id, tags));
    }

    /**
     * Fetches the POI with the given id from the handler
     * @param id the id to get
     * @returns the POI with the given id
     */
    public get(id:number): Poi {
        return this._map.get(id);
    }

    /**
     * Sets the given POI at the given id into the map
     * @param id the id of the POI
     * @param poi the POI to add
     */
    public set(id:number, poi:Poi) {
        this._map.set(id, poi);
    }

    /**
     * Deletes the given POI from the handler
     * @param id the id of the poi
     */
    public delete(id:number) {
        this._map.delete(id);
    }

    /**
     * Adds the key-value pair to the given id, creating a POI if it is not already existent
     * @param id the id of the POI in respective
     * @param key the key to add
     * @param value the value to add
     */
    public addKeyValuePair(id:number, key:string, value:string) {
        if (!this._map.has(id)) this.addPoi(id);
        this._map.get(id).tags[key] = value;
    }

    /**
     * Deletes the given key at the given POI
     * @param id the id of the POI
     * @param key the key to delete
     */
    public removeKey(id:number, key:string) {
        delete this._map.get(id).tags[key];
    }

    /**
     * Calls the given callback function for each POI 
     * @param callback the function to call
     */
    public forEach(callback:(poi:Poi, id:number) => void) {
        this._map.forEach(callback);
    }

    /**
     * An array representation of all POIs
     */
    public get pois():Poi[] {return [...this._map.values()];}
    
    /**
     * The number of POIs in this PoiHandler
     */
    public get size():number {return this._map.size;}
    
    /**
     * A deep copy of the PoiHandler
     */
    public get copy():PoiHandler {
        const copy = new Map<number, Poi>();
        this._map.forEach((value, key) => copy.set(key, value.copy));
        return new PoiHandler(copy);
    }
}