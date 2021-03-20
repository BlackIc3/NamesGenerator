import { Poi } from "./poi";

export class PoiHandler {
    private _map: Map<number, Poi>;

    constructor(map?:Map<number, Poi>) {
        this._map = !!map ? map : new Map<number, Poi>();
    }

    public addPoi(id: number, tags?: string[][]) {
        this._map.set(id, new Poi(id, tags));
    }

    public get(id:number): Poi {
        return this._map.get(id);
    }

    public set(id:number, poi:Poi) {
        this._map.set(id, poi);
    }

    public delete(id:number) {
        this._map.delete(id);
    }

    public addKeyValuePair(id:number, key:string, value:string) {
        if (!this._map.has(id)) this.addPoi(id);
        this._map.get(id).tags[key] = value;
    }

    public removeKey(id:number, key:string) {
        delete this._map.get(id).tags[key];
    }

    public forEach(callback:(poi:Poi, id:number) => void) {
        this._map.forEach(callback);
    }

    public get pois():Poi[] {return [...this._map.values()];}
    public get size():number {return this._map.size;}
    public get copy():PoiHandler {
        const copy = new Map<number, Poi>();
        this._map.forEach((value, key) => copy.set(key, value.copy));
        return new PoiHandler(copy);
    }
}