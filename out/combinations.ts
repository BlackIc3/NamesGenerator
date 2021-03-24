import { ICombination } from "../models/combinationModel";

export const combinations: ICombination[] = [
	{
		// 41 * 41
		key: 'amenity,bench',
		needed: 189613,
		adjectives: ['test'],
		descriptions: [{adjectiveEnding:'iger', description:'Test'}]
	},
	{
		// 31 * 31
		key: 'amenity,bench,backrest,yes,material,wood',
		needed: 108473,
		adjectives: ['test'],
		descriptions: [{adjectiveEnding:'iger', description:'Test'}]
	},
	{
		// 28 * 28
		key: 'amenity,bench,backrest,yes',
		needed: 83902,
		adjectives: ['test'],
		descriptions: [{adjectiveEnding:'iger', description:'Test'}]
	},
	{
		// 26 * 26
		key: 'amenity,hunting_stand',
		needed: 72861,
		adjectives: ['test'],
		descriptions: [{adjectiveEnding:'iger', description:'Test'}]
	},
	{
		// 23 * 23
		key: 'amenity',
		needed: 58045,
		adjectives: ['test'],
		descriptions: [{adjectiveEnding:'iger', description:'Test'}]
	},
	{
		// 16 * 16
		key: 'leisure,playground',
		needed: 27401,
		adjectives: ['test'],
		descriptions: [{adjectiveEnding:'iger', description:'Test'}]
	},
	{
		// 15 * 15
		key: 'tourism,picnic_site',
		needed: 25267,
		adjectives: ['test'],
		descriptions: [{adjectiveEnding:'iger', description:'Test'}]
	},
	{
		// 15 * 15
		key: 'tourism',
		needed: 23589,
		adjectives: ['test'],
		descriptions: [{adjectiveEnding:'iger', description:'Test'}]
	},
	{
		// 14 * 14
		key: 'leisure',
		needed: 20430,
		adjectives: ['test'],
		descriptions: [{adjectiveEnding:'iger', description:'Test'}]
	},
	{
		// 12 * 12
		key: 'amenity,bench,backrest,no,material,wood',
		needed: 15519,
		adjectives: ['test'],
		descriptions: [{adjectiveEnding:'iger', description:'Test'}]
	},
	{
		// 11 * 11
		key: 'amenity,bench,backrest,no',
		needed: 13068,
		adjectives: ['test'],
		descriptions: [{adjectiveEnding:'iger', description:'Test'}]
	},
	{
		// 11 * 11
		key: 'amenity,bench,backrest,yes,material,metal',
		needed: 12474,
		adjectives: ['test'],
		descriptions: [{adjectiveEnding:'iger', description:'Test'}]
	},
	{
		// 10 * 10
		key: 'historic,wayside_shrine',
		needed: 11147,
		adjectives: ['test'],
		descriptions: [{adjectiveEnding:'iger', description:'Test'}]
	},
	{
		// 10 * 10
		key: 'historic,memorial',
		needed: 10575,
		adjectives: ['test'],
		descriptions: [{adjectiveEnding:'iger', description:'Test'}]
	},
	{
		// 9 * 9
		key: 'amenity,bench,backrest,yes,seats',
		needed: 8836,
		adjectives: ['test'],
		descriptions: [{adjectiveEnding:'iger', description:'Test'}]
	},
	{
		// 9 * 9
		key: 'amenity,bench,material',
		needed: 8706,
		adjectives: ['test'],
		descriptions: [{adjectiveEnding:'iger', description:'Test'}]
	},
	{
		// 9 * 9
		key: 'amenity,hunting_stand,shelter,yes,height',
		needed: 7783,
		adjectives: ['test'],
		descriptions: [{adjectiveEnding:'iger', description:'Test'}]
	},
	{
		// 9 * 9
		key: 'amenity,hunting_stand,shelter,yes',
		needed: 7294,
		adjectives: ['test'],
		descriptions: [{adjectiveEnding:'iger', description:'Test'}]
	},
	{
		// 8 * 8
		key: 'amenity,bench,backrest,yes,material',
		needed: 7175,
		adjectives: ['test'],
		descriptions: [{adjectiveEnding:'iger', description:'Test'}]
	},
	{
		// 8 * 8
		key: 'amenity,hunting_stand,shelter',
		needed: 5721,
		adjectives: ['test'],
		descriptions: [{adjectiveEnding:'iger', description:'Test'}]
	},
	{
		// 7 * 7
		key: 'amenity,hunting_stand,height',
		needed: 5019,
		adjectives: ['test'],
		descriptions: [{adjectiveEnding:'iger', description:'Test'}]
	},
	{
		// 7 * 7
		key: 'amenity,bench,backrest,no,material',
		needed: 4921,
		adjectives: ['test'],
		descriptions: [{adjectiveEnding:'iger', description:'Test'}]
	},
	{
		// 6 * 6
		key: 'amenity,bench,source',
		needed: 3077,
		adjectives: ['test'],
		descriptions: [{adjectiveEnding:'iger', description:'Test'}]
	},
	{
		// 5 * 5
		key: '',
		needed: 2102,
		adjectives: ['test'],
		descriptions: [{adjectiveEnding:'iger', description:'Test'}]
	},
	{
		// 4 * 4
		key: 'amenity,bench,survey:date',
		needed: 1517,
		adjectives: ['test'],
		descriptions: [{adjectiveEnding:'iger', description:'Test'}]
	},
	{
		// 4 * 4
		key: 'historic',
		needed: 1075,
		adjectives: [
			'alt',
			'ehrwürdig',
			'historisch',
			'ruhmreich'
		],
		descriptions: [
			{adjectiveEnding: 'e', description: 'Stätte'},
			{adjectiveEnding: 'er', description: 'Platz'},
			{adjectiveEnding: 'er', description: 'Ort'},
			{adjectiveEnding: 'es', description: 'Gemäuer'},
		]
	},
	{
		// 2 * 2
		key: 'amenity,bench,backrest',
		needed: 132,
		adjectives: [
			'ruhig',
			'gemütlich'
		],
		descriptions: [
			{adjectiveEnding: 'e', description: 'Bank'},
			{adjectiveEnding: 'er', description: 'Rastplatz'}
		]
	},
];