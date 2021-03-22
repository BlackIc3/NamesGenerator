export class Poi {
    private _id: number;
    public tags: {};

    /**
     * Creates an object representation of a POI
     * @param id the id of the poi
     * @param tags the keys and values of the poi
     */
    constructor(id: number, tags?: string[][]) {
        this._id = id;
        this.tags = {};
        tags?.forEach((pair) => this.tags[pair[0]] = pair[1]);
    }

    /**
     * The id of the POI
     */
    public get id():number { return this._id; }
    
    /**
     * A deep copy of the POI
     */
    public get copy():Poi {return new Poi(this._id, Object.entries(this.tags));}
}