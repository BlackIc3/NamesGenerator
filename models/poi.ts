export class Poi {
    private _id: number;
    public tags: {};

    constructor(id: number, tags?: string[][]) {
        this._id = id;
        this.tags = {};
        tags?.forEach((pair) => this.tags[pair[0]] = pair[1]);
    }

    public get id():number { return this._id; }
    public get copy():Poi {return new Poi(this._id, Object.entries(this.tags));}
}