export interface ICombination {
    /**
     * The concatenation of keys and values of this combination (e.g. 'amenity,bench,backrest,yes')
     */
    key: string;
    /**
     * The amount of pois with this key/value combination needing a name 
     */
    needed: number;
    /**
     * The adjectives for the current combination, eg: ['ruhig', 'gemütlich', 'aufregend', 'schön', ...]
     */
    adjectives: string[];
    /**
     * The descriptions for the current combination, eg: [{adjectiveEnding: 'e', description: 'Bank'}, ...]
     */
    descriptions: IDescription[];
}

export interface IDescription {
    /**
     * The ending to append to a preceeding adjective to match the gender of the description, e.g.: 'ruhig' (=adjective) + 'e' (=adjectiveEnding) + 'Bank' (=description)
     */
    adjectiveEnding: string;
    /**
     * A possible description for the current combination, e.g.: 'Bank', 'Sitzbank', ...
     */
    description: string;
}