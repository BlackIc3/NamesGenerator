export class Poi {
    private _id: number;
    private _lat: number;
    private _long: number;
    private _clusterLabel: number;
    public tags: {};

    /**
     * Creates an object representation of a POI
     * @param id the id of the poi
     * @param lat the latitude of the poi
     * @param long the longitude of the poi
     * @param tags the keys and values of the poi
     */
    constructor(id: number, lat: number, long: number, tags?: string[][]) {
        this._id = id;
        this._lat = lat;
        this._long = long;
        this._clusterLabel = -1;
        this.tags = {};
        tags?.forEach((pair) => this.tags[pair[0]] = pair[1]);
    }

    /**
     * The id of the POI
     */
    public get id(): number { return this._id; }

    /**
     * The latitude of the POI
     */
    public get lat(): number { return this._lat; }

    /**
     * The longitude of the POI
     */
    public get long(): number { return this._long; }

    /**
     * The cluster label of the POI.  
     * -1 == not processed  
     * 0 == Noise  
     * \>0 == clusterID  
     */
    public get clusterLabel(): number { return this._clusterLabel; }

    /**
     * The cluster label of the POI.  
     * -1 == not processed  
     * 0 == Noise  
     * \>0 == clusterID  
     */
    public set clusterLabel(x: number) { this._clusterLabel = x; }

    /**
     * A deep copy of the POI
     */
    public get copy(): Poi { return new Poi(this._id, this._lat, this.long, Object.entries(this.tags)); }
}