import { ICombination } from "../models/combinationModel";

export const combinations: ICombination[] = [
	{
		// 10 * 10
		// 1 * 1 missing
		key: 'amenity,bench,backrest,yes',
		total: 97107,
		approxEntries: 10,
		biggestCluster: 9934,
		clusters: 144,
		adjectives: ['', 'bequem', 'komfortabl', 'unbequem', 'schäbig', 'verkommen', 'reizend', 'schnucklig', 'schön'],
		descriptions: [
			{adjectiveEnding: 'e', description: 'Bank'},
			{adjectiveEnding: 'e', description: 'Sitzbank'},
			{adjectiveEnding: 'er', description: 'Rastplatz'},
			{adjectiveEnding: 'e', description: 'Parkbank'},
			{adjectiveEnding: 'er', description: 'Sitzplatz'},
			{adjectiveEnding: 'e', description: 'Sitzgelegenheit'},
			{adjectiveEnding: 'er', description: 'Platz'},
			{adjectiveEnding: 'er', description: 'Treffpunkt'},
			{adjectiveEnding: 'er', description: 'Sitz'}
		]
	},
	{
		// 10 * 10
		// 1 * 1 missing
		key: 'tourism,viewpoint',
		total: 12550,
		approxEntries: 10,
		biggestCluster: 9604,
		clusters: 181,
		adjectives: ['', 'spannend', 'atemberaubend', 'erstaunlich', 'inspirierend', 'exklusiv', 'herausragend', 'überragend', 'berrauschend'],
		descriptions: [
			{adjectiveEnding: 'er', description: 'Aussichtspunkt'},
			{adjectiveEnding: 'e', description: 'Aussicht'},
			{adjectiveEnding: 'e', description: 'Sicht'},
			{adjectiveEnding: 'er', description: 'Ausblick'},
			{adjectiveEnding: 'er', description: 'Ausblickspunkt'},
			{adjectiveEnding: 'e', description: 'Perspektive'},
			{adjectiveEnding: 'er', description: 'Aussichtsort'},
			{adjectiveEnding: 'e', description: 'Umgebung'},
			{adjectiveEnding: 'es', description: 'Gebiet'}
		]
	},
	{
		// 10 * 10
		// 1 * 1 missing
		key: 'amenity,hunting_stand',
		total: 80025,
		approxEntries: 10,
		biggestCluster: 9385,
		clusters: 78,
		adjectives: ['', 'versteckt', 'verborgen', 'alt', 'anmutig', 'beachtlich', 'geheim', 'dunkl', 'rätselhaft'],
		descriptions: [
			{adjectiveEnding: 'er', description: 'Jagdstand'},
			{adjectiveEnding: 'e', description: 'Jagdkanzel'},
			{adjectiveEnding: 'e', description: 'Wildkanzel'},
			{adjectiveEnding: 'er', description: 'Jagdsitz'},
			{adjectiveEnding: 'er', description: 'Hochsitz'},
			{adjectiveEnding: 'er', description: 'Hochtsand'},
			{adjectiveEnding: 'er', description: 'Stand'},
			{adjectiveEnding: 'er', description: 'Ansitz'},
			{adjectiveEnding: 'er', description: 'Anstand'}
		]
	},
	{
		// 9 * 9
		key: 'leisure,playground',
		total: 23433,
		approxEntries: 9,
		biggestCluster: 9137,
		clusters: 109,
		adjectives: ['', 'spaßig', 'freudig', 'lustig', 'aufregend', 'spannend', 'großartig', 'schwungvoll', 'heiter'],
		descriptions: [
			{adjectiveEnding: 'er', description: 'Spielplatz'},
			{adjectiveEnding: 'e', description: 'Spielstätte'},
			{adjectiveEnding: 'er', description: 'Platz'},
			{adjectiveEnding: 'es', description: 'Feld'},
			{adjectiveEnding: 'es', description: 'Spielfeld'},
			{adjectiveEnding: 'er', description: 'Kinderspielplatz'},
			{adjectiveEnding: 'e', description: 'Spielfläche'},
			{adjectiveEnding: 'er', description: 'Treffpunkt'},
			{adjectiveEnding: 'er', description: 'Vergnügungspark'}
		]
	},
	{
		// 9 * 9
		// 1 * 1 missing
		key: 'amenity',
		total: 11317,
		approxEntries: 9,
		biggestCluster: 8115,
		clusters: 197,
		adjectives: ['', 'beliebt', 'angenehm', 'betörend', 'festlich', 'magisch', 'verzaubernd', 'verwunschen'],
		descriptions: [
			{adjectiveEnding: 'er', description: 'Ort'},
			{adjectiveEnding: 'er', description: 'Platz'},
			{adjectiveEnding: 'er', description: 'Punkt'},
			{adjectiveEnding: 'er', description: 'Fleck'},
			{adjectiveEnding: 'es', description: 'Fleckchen'},
			{adjectiveEnding: 'e', description: 'Ecke'},
			{adjectiveEnding: 'er', description: 'Landstrich'},
			{adjectiveEnding: 'es', description: 'Viertel'}
		]
	},
	{
		// 9 * 9
		key: 'amenity,fountain',
		total: 11581,
		approxEntries: 9,
		biggestCluster: 8103,
		clusters: 227,
		adjectives: ['', 'verwunschen', 'betörend', 'bezaubernd', 'faszinierend', 'bemerkenswert', 'außergewöhnlich', 'nass', 'idyllisch'],
		descriptions: [
			{adjectiveEnding: 'e', description: 'Fontäne'},
			{adjectiveEnding: 'er', description: 'Brunnen'},
			{adjectiveEnding: 'e', description: 'Wasserspiele'},
			{adjectiveEnding: 'e', description: 'Wasserquelle'},
			{adjectiveEnding: 'e', description: 'Wasserstelle'},
			{adjectiveEnding: 'er', description: 'Wasserbrunnen'},
			{adjectiveEnding: 'er', description: 'Springbrunnen'},
			{adjectiveEnding: 'es', description: 'Wasser'},
			{adjectiveEnding: 'es', description: 'Gewässer'}
		]
	},
	{
		// 8 * 8
		key: 'amenity,shelter',
		total: 11712,
		approxEntries: 8,
		biggestCluster: 7011,
		clusters: 174,
		adjectives: ['', 'versteckt', 'sicher', 'schutzbietend', 'alt', 'verwunschen', 'dunkl', 'schäbig'],
		descriptions: [
			{adjectiveEnding: 'e', description: 'Hütte'},
			{adjectiveEnding: 'er', description: 'Unterschlupf'},
			{adjectiveEnding: 'er', description: 'Unterstand'},
			{adjectiveEnding: 'e', description: 'Barracke'},
			{adjectiveEnding: 'es', description: 'Häuschen'},
			{adjectiveEnding: 'e', description: 'Kate'},
			{adjectiveEnding: 'er', description: 'Schuppen'},
			{adjectiveEnding: 'e', description: 'Scheune'}
		]
	},
	{
		// 8 * 8
		key: 'amenity,bench,backrest,yes,material,wood',
		total: 108473,
		approxEntries: 8,
		biggestCluster: 6581,
		clusters: 163,
		adjectives: ['', 'hölzern', 'morsch', 'idyllisch', 'abgelegen', 'malerisch', 'romantisch', 'gemütlich'],
		descriptions: [
			{adjectiveEnding: 'e', description: 'Holzbank'},
			{adjectiveEnding: 'e', description: 'Bank'},
			{adjectiveEnding: 'e', description: 'Parkbank'},
			{adjectiveEnding: 'e', description: 'Sitzbank'},
			{adjectiveEnding: 'e', description: 'Sitzgelegenheit'},
			{adjectiveEnding: 'er', description: 'Sitz'},
			{adjectiveEnding: 'er', description: 'Rastplatz'},
			{adjectiveEnding: 'er', description: 'Platz'}
		]
	},
	{
		// 8 * 8
		// 1 * 1 missing
		key: 'leisure,picnic_table',
		total: 17331,
		approxEntries: 8,
		biggestCluster: 6338,
		clusters: 178,
		adjectives: ['', 'klein', 'schattig', 'idyllisch', 'abgelegen', 'romantisch', 'malerisch'],
		descriptions: [
			{adjectiveEnding: 'er', description: 'Picknicktisch'},
			{adjectiveEnding: 'er', description: 'Picknickplatz'},
			{adjectiveEnding: 'er', description: 'Tisch'},
			{adjectiveEnding: 'es', description: 'Örtchen'},
			{adjectiveEnding: 'e', description: 'Sitzgruppe'},
			{adjectiveEnding: 'e', description: 'Tafel'},
			{adjectiveEnding: 'e', description: 'Picknicktafel'}
		]
	},
	{
		// 8 * 8
		key: 'amenity,bench',
		total: 194207,
		approxEntries: 8,
		biggestCluster: 6068,
		clusters: 104,
		adjectives: ['', 'schön', 'gut', 'kantig', 'schlecht', 'bekannt', 'unbekannt', 'geheim'],
		descriptions: [
			{adjectiveEnding: 'e', description: 'Bank'},
			{adjectiveEnding: 'e', description: 'Parkbank'},
			{adjectiveEnding: 'e', description: 'Sitzbank'},
			{adjectiveEnding: 'e', description: 'Sitzgelegenheit'},
			{adjectiveEnding: 'e', description: 'Sitzmöglichkeit'},
			{adjectiveEnding: 'er', description: 'Sitzplatz'},
			{adjectiveEnding: 'er', description: 'Platz'},
			{adjectiveEnding: 'er', description: 'Pausenort'}
		]
	},
	{
		// 7 * 7
		key: 'tourism,picnic_site',
		total: 23629,
		approxEntries: 7,
		biggestCluster: 5176,
		clusters: 95,
		adjectives: ['', 'klein', 'einladend', 'versteckt', 'verloren', 'heilsam', 'charmant'],
		descriptions: [
			{adjectiveEnding: 'er', description: 'Picknickplatz'},
			{adjectiveEnding: 'es', description: 'Plätzchen'},
			{adjectiveEnding: 'es', description: 'Örtchen'},
			{adjectiveEnding: 'er', description: 'Platz'},
			{adjectiveEnding: 'e', description: 'Picknickfläche'},
			{adjectiveEnding: 'er', description: 'Verweilort'},
			{adjectiveEnding: 'er', description: 'Fleck'}
		]
	},
	{
		// 7 * 7
		// 3 * 3 missing
		key: 'amenity,bench,backrest,no',
		total: 14203,
		approxEntries: 7,
		biggestCluster: 4096,
		clusters: 312,
		adjectives: ['', 'hart', 'unbeliebt', 'untauglich'],
		descriptions: [
			{adjectiveEnding: 'e', description: 'Bank'},
			{adjectiveEnding: 'er', description: 'Pausenort'},
			{adjectiveEnding: 'e', description: 'Sitzbank'},
			{adjectiveEnding: 'e', description: 'Parkbank'}
		]
	},
	{
		// 6 * 6
		// 1 * 1 missing
		key: 'amenity,bench,backrest,yes,material,metal',
		total: 13380,
		approxEntries: 6,
		biggestCluster: 3045,
		clusters: 281,
		adjectives: ['', 'kalt', 'eisern', 'edl', 'rostig'],
		descriptions: [
			{adjectiveEnding: 'e', description: 'Metallbank'},
			{adjectiveEnding: 'e', description: 'Stahlbank'},
			{adjectiveEnding: 'e', description: 'Bank'},
			{adjectiveEnding: 'e', description: 'Sitzbank'},
			{adjectiveEnding: 'er', description: 'Sitzplatz'}
		]
	},
	{
		// 5 * 5
		key: 'historic,wayside_shrine',
		total: 6388,
		approxEntries: 5,
		biggestCluster: 2494,
		clusters: 92,
		adjectives: ['', 'bedeutsam', 'glänzend', 'ungeheur', 'schimmernd'],
		descriptions: [
			{adjectiveEnding: 'er', description: 'Schrein'},
			{adjectiveEnding: 'es', description: 'Marterl'},
			{adjectiveEnding: 'es', description: 'Kleindenkmal'},
			{adjectiveEnding: 'er', description: 'Bildstock'},
			{adjectiveEnding: 'es', description: 'Wegkreuz'}
		]
	},
	{
		// 5 * 5
		key: 'amenity,bench,backrest,yes,seats',
		total: 8836,
		approxEntries: 5,
		biggestCluster: 2399,
		clusters: 254,
		adjectives: ['', 'verflucht', 'verrucht', 'perfid', 'prächtig'],
		descriptions: [
			{adjectiveEnding: 'e', description: 'Sitzgruppe'},
			{adjectiveEnding: 'e', description: 'Sitze'},
			{adjectiveEnding: 'e', description: 'Bank'},
			{adjectiveEnding: 'e', description: 'Sitzbank'},
			{adjectiveEnding: 'e', description: 'Parkbank'}
		]
	},
	{
		// 5 * 5
		key: 'historic,wayside_shrine,religion',
		total: 4759,
		approxEntries: 5,
		biggestCluster: 2241,
		clusters: 95,
		adjectives: ['', 'bedrohlich', 'verdächtig', 'göttlich', 'religiös'],
		descriptions: [
			{adjectiveEnding: 'er', description: 'Schrein'},
			{adjectiveEnding: 'es', description: 'Marterl'},
			{adjectiveEnding: 'es', description: 'Kleindenkmal'},
			{adjectiveEnding: 'er', description: 'Bildstock'},
			{adjectiveEnding: 'es', description: 'Wegkreuz'}
		]
	},
	{
		// 5 * 5
		key: 'amenity,bench,backrest,no,material,wood',
		total: 15519,
		approxEntries: 5,
		biggestCluster: 2047,
		clusters: 283,
		adjectives: ['', 'unschön', 'hölzern', 'abgelegen', 'unscheinbar'],
		descriptions: [
			{adjectiveEnding: 'e', description: 'Holzbank'},
			{adjectiveEnding: 'e', description: 'Bank'},
			{adjectiveEnding: 'e', description: 'Sitzbank'},
			{adjectiveEnding: 'e', description: 'Parkbank'},
			{adjectiveEnding: 'er', description: 'Sitzplatz'}
		]
	},
	{
		// 4 * 4
		key: 'tourism',
		total: 8436,
		approxEntries: 4,
		biggestCluster: 1395,
		clusters: 292,
		adjectives: ['', 'aufregend', 'belebt', 'lebendig'],
		descriptions: [
			{adjectiveEnding: 'er', description: 'Platz'},
			{adjectiveEnding: 'er', description: 'Ort'},
			{adjectiveEnding: 'e', description: 'Gegend'},
			{adjectiveEnding: 'er', description: 'Fleck'}
		]
	},
	{
		// 4 * 4
		key: 'amenity,hunting_stand,shelter,yes',
		total: 7294,
		approxEntries: 4,
		biggestCluster: 1316,
		clusters: 180,
		adjectives: ['', 'morsch', 'karg', 'hilfreich'],
		descriptions: [
			{adjectiveEnding: 'e', description: 'Wildkanzel'},
			{adjectiveEnding: 'e', description: 'Jagdkanzel'},
			{adjectiveEnding: 'er', description: 'Unterstand'},
			{adjectiveEnding: 'er', description: 'Jagdsitz'}
		]
	},
	{
		// 4 * 4
		key: 'amenity,shelter,shelter_type',
		total: 6314,
		approxEntries: 4,
		biggestCluster: 1267,
		clusters: 225,
		adjectives: ['', 'rettend', 'verloren', 'magisch'],
		descriptions: [
			{adjectiveEnding: 'er', description: 'Schutz'},
			{adjectiveEnding: 'es', description: 'Versteck'},
			{adjectiveEnding: 'e', description: 'Hütte'},
			{adjectiveEnding: 'es', description: 'Häuschen'}
		]
	},
	{
		// 4 * 4
		// 1 * 1 missing
		key: 'amenity,hunting_stand,shelter,yes,height',
		total: 8054,
		approxEntries: 4,
		biggestCluster: 1057,
		clusters: 153,
		adjectives: ['', 'schützend', 'sicher'],
		descriptions: [
			{adjectiveEnding: 'es', description: 'Versteck'},
			{adjectiveEnding: 'er', description: 'Hochsitz'},
			{adjectiveEnding: 'er', description: 'Hochstand'}
		]
	},
	{
		// 4 * 4
		// 1 * 1 missing
		key: 'amenity,bench,material',
		total: 8766,
		approxEntries: 4,
		biggestCluster: 1042,
		clusters: 323,
		adjectives: ['', 'fein', 'angenehm'],
		descriptions: [
			{adjectiveEnding: 'e', description: 'Rastbank'},
			{adjectiveEnding: 'er', description: 'Sitzplatz'},
			{adjectiveEnding: 'er', description: 'Platz'}
		]
	},
	{
		// 3 * 3
		key: 'historic,memorial',
		total: 6908,
		approxEntries: 3,
		biggestCluster: 986,
		clusters: 251,
		adjectives: ['', 'historisch', 'honorig'],
		descriptions: [
			{adjectiveEnding: 'es', description: 'Denkmal'},
			{adjectiveEnding: 'e', description: 'Gedenkstätte'},
			{adjectiveEnding: 'es', description: 'Monument'}
		]
	},
	{
		// 3 * 3
		// 3 * 3 missing
		key: 'amenity,bench,backrest,yes,check_date',
		total: 10406,
		approxEntries: 3,
		biggestCluster: 979,
		clusters: 221,
		adjectives: [],
		descriptions: []
	},
	{
		// 3 * 3
		key: 'amenity,shelter,shelter_type,public_transport',
		total: 5027,
		approxEntries: 3,
		biggestCluster: 904,
		clusters: 219,
		adjectives: ['', 'belebt', 'lebhaft'],
		descriptions: [
			{adjectiveEnding: 'er', description: 'Bahnhof'},
			{adjectiveEnding: 'e', description: 'Haltestelle'},
			{adjectiveEnding: 'e', description: 'Station'}
		]
	},
	{
		// 3 * 3
		key: 'amenity,clock',
		total: 5470,
		approxEntries: 3,
		biggestCluster: 863,
		clusters: 187,
		adjectives: ['', 'gewaltig', 'mächtig'],
		descriptions: [
			{adjectiveEnding: 'e', description: 'Turmuhr'},
			{adjectiveEnding: 'e', description: 'Uhr'},
			{adjectiveEnding: 'es', description: 'Zeitmessgerät'}
		]
	},
	{
		// 3 * 3
		key: 'amenity,hunting_stand,height',
		total: 5019,
		approxEntries: 3,
		biggestCluster: 851,
		clusters: 174,
		adjectives: ['', 'luftig', 'edl'],
		descriptions: [
			{adjectiveEnding: 'er', description: 'Hochstand'},
			{adjectiveEnding: 'er', description: 'Schutz'},
			{adjectiveEnding: 'es', description: 'Versteck'}
		]
	},
	{
		// 3 * 3
		key: 'amenity,hunting_stand,shelter',
		total: 5721,
		approxEntries: 3,
		biggestCluster: 835,
		clusters: 174,
		adjectives: ['', 'mystisch', 'schattig'],
		descriptions: [
			{adjectiveEnding: 'er', description: 'Stand'},
			{adjectiveEnding: 'er', description: 'Unterschlupf'},
			{adjectiveEnding: 'er', description: 'Bunker'}
		]
	},
	{
		// 3 * 3
		key: 'amenity,bench,backrest,yes,material',
		total: 7175,
		approxEntries: 3,
		biggestCluster: 821,
		clusters: 259,
		adjectives: ['', 'behaglich', 'fein'],
		descriptions: [
			{adjectiveEnding: 'e', description: 'Bank'},
			{adjectiveEnding: 'er', description: 'Schemel'},
			{adjectiveEnding: 'e', description: 'Rastgelegenheit'}
		]
	},
	{
		// 3 * 3
		key: 'amenity,post_office',
		total: 3408,
		approxEntries: 3,
		biggestCluster: 694,
		clusters: 172,
		adjectives: ['', 'charmant', 'lokal'],
		descriptions: [
			{adjectiveEnding: 'es', description: 'Posthaus'},
			{adjectiveEnding: 'es', description: 'Postamt'},
			{adjectiveEnding: 'es', description: 'Postgebäude'}
		]
	},
	{
		// 3 * 3
		// 1 * 1 missing
		key: 'leisure,playground,access',
		total: 5168,
		approxEntries: 3,
		biggestCluster: 629,
		clusters: 171,
		adjectives: ['', 'mystisch'],
		descriptions: [
			{adjectiveEnding: 'er', description: 'Spielplatz'},
			{adjectiveEnding: 'e', description: 'Spielstätte'}
		]
	},
	{
		// 3 * 3
		key: 'amenity,fast_food',
		total: 1989,
		approxEntries: 3,
		biggestCluster: 627,
		clusters: 162,
		adjectives: ['', 'ulkig', 'einladend'],
		descriptions: [
			{adjectiveEnding: 'er', description: 'Gasthof'},
			{adjectiveEnding: 'e', description: 'Gaststätte'},
			{adjectiveEnding: 'es', description: 'Wirtshaus'}
		]
	},
	{
		// 3 * 3
		key: 'historic,memorial,memorial',
		total: 3667,
		approxEntries: 3,
		biggestCluster: 603,
		clusters: 212,
		adjectives: ['', 'bedeutungsvoll', 'altertümlich'],
		descriptions: [
			{adjectiveEnding: 'e', description: 'Denkstätte'},
			{adjectiveEnding: 'er', description: 'Schauplatz'},
			{adjectiveEnding: 'er', description: 'Ort'}
		]
	},
	{
		// 3 * 3
		key: 'leisure',
		total: 1912,
		approxEntries: 3,
		biggestCluster: 580,
		clusters: 150,
		adjectives: ['', 'fröhlich', 'erheiternd'],
		descriptions: [
			{adjectiveEnding: 'er', description: 'Festplatz'},
			{adjectiveEnding: 'e', description: 'Spielstätte'},
			{adjectiveEnding: 'e', description: 'Raststätte'}
		]
	},
	{
		// 3 * 3
		key: '',
		total: 2102,
		approxEntries: 3,
		biggestCluster: 568,
		clusters: 123,
		adjectives: ['', 'mystisch', 'kurios'],
		descriptions: [
			{adjectiveEnding: 'er', description: 'Ort'},
			{adjectiveEnding: 'er', description: 'Platz'},
			{adjectiveEnding: 'e', description: 'Gegend'}
		]
	},
	{
		// 3 * 3
		// 1 * 1 missing
		key: 'amenity,bench,backrest,no,material',
		total: 5399,
		approxEntries: 3,
		biggestCluster: 470,
		clusters: 226,
		adjectives: ['', 'ungemütlich'],
		descriptions: [
			{adjectiveEnding: 'e', description: 'Sitzbank'},
			{adjectiveEnding: 'e', description: 'Bank'}
		]
	},
	{
		// 3 * 3
		key: 'historic',
		total: 1075,
		approxEntries: 3,
		biggestCluster: 468,
		clusters: 97,
		adjectives: ['', 'ehrwürdig', 'historisch'],
		descriptions: [
			{adjectiveEnding: 'e', description: 'Stätte'},
			{adjectiveEnding: 'er', description: 'Ort'},
			{adjectiveEnding: 'er', description: 'Platz'}
		]
	},
	{
		// 2 * 2
		key: 'leisure,picnic_table,covered',
		total: 3860,
		approxEntries: 2,
		biggestCluster: 441,
		clusters: 239,
		adjectives: ['', 'einladend', 'annehmbar'],
		descriptions: [
			{adjectiveEnding: 'er', description: 'Picknick-Tisch'},
			{adjectiveEnding: 'er', description: 'Brotzeitplatz'},
			{adjectiveEnding: 'er', description: 'Tisch'}
		]
	},
	{
		// 2 * 2
		key: 'tourism,picnic_site,fireplace',
		total: 1638,
		approxEntries: 2,
		biggestCluster: 384,
		clusters: 99,
		adjectives: ['', 'entspannend'],
		descriptions: [
			{adjectiveEnding: 'e', description: 'Lagerfeuerstätte'},
			{adjectiveEnding: 'er', description: 'Lagerplatz'}
		]
	},
	{
		// 2 * 2
		key: 'amenity,fountain,drinking_water',
		total: 1113,
		approxEntries: 2,
		biggestCluster: 359,
		clusters: 80,
		adjectives: ['', 'erfrischend'],
		descriptions: [
			{adjectiveEnding: 'er', description: 'Trinkwasserbrunnen'},
			{adjectiveEnding: 'e', description: 'Wasserquelle'}
		]
	},
	{
		// 2 * 2
		key: 'tourism,viewpoint,direction',
		total: 2721,
		approxEntries: 2,
		biggestCluster: 355,
		clusters: 166,
		adjectives: ['', 'anmutig'],
		descriptions: [
			{adjectiveEnding: 'er', description: 'Aussichtspunkt'},
			{adjectiveEnding: 'e', description: 'Stätte'}
		]
	},
	{
		// 2 * 2
		key: 'amenity,shelter,bench',
		total: 442,
		approxEntries: 2,
		biggestCluster: 272,
		clusters: 38,
		adjectives: ['', 'gemütlich'],
		descriptions: [
			{adjectiveEnding: 'er', description: 'Unterschlupf'},
			{adjectiveEnding: 'er', description: 'Unterstand'}
		]
	},
	{
		// 2 * 2
		key: 'amenity,bench,backrest,no,seats',
		total: 1198,
		approxEntries: 2,
		biggestCluster: 235,
		clusters: 73,
		adjectives: ['', 'ruhig'],
		descriptions: [
			{adjectiveEnding: 'e', description: 'Bank'},
			{adjectiveEnding: 'er', description: 'Rastplatz'}
		]
	},
	{
		// 2 * 2
		// 2 * 2 missing
		key: 'amenity,bench,backrest,no,check_date',
		total: 1616,
		approxEntries: 2,
		biggestCluster: 126,
		clusters: 110,
		adjectives: [],
		descriptions: []
	},
	{
		// 1 * 1
		key: 'amenity,bench,backrest',
		total: 132,
		approxEntries: 1,
		biggestCluster: 68,
		clusters: 11,
		adjectives: [''],
		descriptions: [
			{adjectiveEnding: 'e', description: 'Sitzbank'}
		]
	},
	{
		// 1 * 1
		// 1 * 1 missing
		key: 'amenity,bench,backrest,yes,check_date,2021-02-20',
		total: 171,
		approxEntries: 1,
		biggestCluster: 48,
		clusters: 20,
		adjectives: [],
		descriptions: []
	},
];