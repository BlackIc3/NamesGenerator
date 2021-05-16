import { ICombination } from "../models/combinationModel";

export const combinations: ICombination[] = [
	{
		// 9 * 9
		key: 'leisure,playground',
		total: 23433,
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
			{adjectiveEnding: 'er', description: 'Vergnügungspark'},
		]
	},
	{
		// 9 * 9
		key: 'amenity,hunting_stand',
		total: 72861,
		biggestCluster: 8544,
		clusters: 86,
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
			{adjectiveEnding: 'er', description: 'Anstand'},
		]
	},
	{
		// 9 * 9
		key: 'amenity,bench,backrest,yes',
		total: 83902,
		biggestCluster: 8495,
		clusters: 163,
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
			{adjectiveEnding: 'er', description: 'Sitz'},
		]
	},
	{
		// 9 * 9
		key: 'tourism,viewpoint',
		total: 12432,
		biggestCluster: 8403,
		clusters: 179,
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
		// 9 * 9
		key: 'amenity,fountain',
		total: 11581,
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
			{adjectiveEnding: 'es', description: 'Gewässer'},
		]
	},
	{
		// 8 * 8
		key: 'amenity,shelter',
		total: 11712,
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
			{adjectiveEnding: 'e', description: 'Scheune'},
		]
	},
	{
		// 8 * 8
		key: 'amenity,bench,backrest,yes,material,wood',
		total: 108473,
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
			{adjectiveEnding: 'er', description: 'Platz'},
		]
	},
	{
		// 8 * 8
		key: 'amenity',
		total: 10989,
		biggestCluster: 6308,
		clusters: 199,
		adjectives: ['', 'beliebt', 'angenehm', 'betörend', 'festlich', 'magisch', 'verzaubernd', 'verwunschen'],
		descriptions: [
			{adjectiveEnding: 'er', description: 'Ort'},
			{adjectiveEnding: 'er', description: 'Platz'},
			{adjectiveEnding: 'er', description: 'Punkt'},
			{adjectiveEnding: 'er', description: 'Fleck'},
			{adjectiveEnding: 'es', description: 'Fleckchen'},
			{adjectiveEnding: 'e', description: 'Ecke'},
			{adjectiveEnding: 'er', description: 'Landstrich'},
			{adjectiveEnding: 'es', description: 'Viertel'},
		]
	},
	{
		// 8 * 8
		key: 'amenity,bench',
		total: 194207,
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
			{adjectiveEnding: 'er', description: 'Pausenort'},
		]
	},
	{
		// 7 * 7
		key: 'leisure,picnic_table',
		total: 15320,
		biggestCluster: 5179,
		clusters: 204,
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
		// 7 * 7
		key: 'tourism,picnic_site',
		total: 23629,
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
			{adjectiveEnding: 'er', description: 'Fleck'},
		]
	},
	{
		// 5 * 5
		key: 'amenity,bench,backrest,yes,material,metal',
		total: 12474,
		biggestCluster: 2678,
		clusters: 281,
		adjectives: ['', 'kalt', 'eisern', 'edl', 'rostig'],
		descriptions: [
			{adjectiveEnding: 'e', description: 'Metallbank'},
			{adjectiveEnding: 'e', description: 'Stahlbank'},
			{adjectiveEnding: 'e', description: 'Bank'},
			{adjectiveEnding: 'e', description: 'Sitzbank'},
			{adjectiveEnding: 'er', description: 'Sitzplatz'},
		]
	},
	{
		// 5 * 5
		key: 'historic,wayside_shrine',
		total: 6388,
		biggestCluster: 2494,
		clusters: 92,
		adjectives: ['', 'bedeutsam', 'glänzend', 'ungeheur', 'schimmernd'],
		descriptions: [
			{adjectiveEnding: 'er', description: 'Schrein'},
			{adjectiveEnding: 'es', description: 'Marterl'},
			{adjectiveEnding: 'es', description: 'Kleindenkmal'},
			{adjectiveEnding: 'er', description: 'Bildstock'},
			{adjectiveEnding: 'es', description: 'Wegkreuz'},

		]
	},
	{
		// 5 * 5
		key: 'amenity,bench,backrest,yes,seats',
		total: 8836,
		biggestCluster: 2399,
		clusters: 254,
		adjectives: ['', 'verflucht', 'verrucht', 'perfid', 'prächtig'],
		descriptions: [
			{adjectiveEnding: 'e', description: 'Sitzgruppe'},
			{adjectiveEnding: 'e', description: 'Sitze'},
			{adjectiveEnding: 'e', description: 'Bank'},
			{adjectiveEnding: 'e', description: 'Sitzbank'},
			{adjectiveEnding: 'e', description: 'Parkbank'},
		]
	},
	{
		// 5 * 5
		key: 'historic,wayside_shrine,religion',
		total: 4759,
		biggestCluster: 2241,
		clusters: 95,
		adjectives: ['', 'bedrohlich', 'verdächtig', 'göttlich', 'religiös'],
		descriptions: [
			{adjectiveEnding: 'er', description: 'Schrein'},
			{adjectiveEnding: 'es', description: 'Marterl'},
			{adjectiveEnding: 'es', description: 'Kleindenkmal'},
			{adjectiveEnding: 'er', description: 'Bildstock'},
			{adjectiveEnding: 'es', description: 'Wegkreuz'},
		]
	},
	{
		// 5 * 5
		key: 'amenity,bench,backrest,no,material,wood',
		total: 15519,
		biggestCluster: 2047,
		clusters: 283,
		adjectives: ['', 'unschön', 'hölzern', 'abgelegen', 'unscheinbar'],
		descriptions: [
			{adjectiveEnding: 'e', description: 'Holzbank'},
			{adjectiveEnding: 'e', description: 'Bank'},
			{adjectiveEnding: 'e', description: 'Sitzbank'},
			{adjectiveEnding: 'e', description: 'Parkbank'},
			{adjectiveEnding: 'er', description: 'Sitzplatz'},
		]
	},
	{
		// 4 * 4
		key: 'amenity,bench,backrest,no',
		total: 11870,
		biggestCluster: 1740,
		clusters: 321,
		adjectives: ['', 'hart', 'unbeliebt', 'untauglich'],
		descriptions: [
			{adjectiveEnding: 'e', description: 'Bank'},
			{adjectiveEnding: 'er', description: 'Pausenort'},
			{adjectiveEnding: 'e', description: 'Sitzbank'},
			{adjectiveEnding: 'e', description: 'Parkbank'},
		]
	},
	{
		// 4 * 4
		key: 'tourism',
		total: 8436,
		biggestCluster: 1395,
		clusters: 292,
		adjectives: ['', 'aufregend', 'belebt', 'lebendig'],
		descriptions: [
			{adjectiveEnding: 'er', description: 'Platz'},
			{adjectiveEnding: 'er', description: 'Ort'},
			{adjectiveEnding: 'e', description: 'Gegend'},
			{adjectiveEnding:'er', description: 'Fleck'},
		]
	},
	{
		// 4 * 4
		key: 'amenity,hunting_stand,shelter,yes',
		total: 7294,
		biggestCluster: 1316,
		clusters: 180,
		adjectives: ['', 'morsch', 'karg', 'hilfreich'],
		descriptions: [
			{adjectiveEnding: 'e', description: 'Wildkanzel'},
			{adjectiveEnding: 'e', description: 'Jagdkanzel'},
			{adjectiveEnding: 'er', description: 'Unterstand'},
			{adjectiveEnding: 'er', description: 'Jagdsitz'},
		]
	},
	{
		// 4 * 4
		key: 'amenity,shelter,shelter_type',
		total: 6314,
		biggestCluster: 1267,
		clusters: 225,
		adjectives: ['','rettend', 'verloren', 'magisch'],
		descriptions: [
			{adjectiveEnding: 'er', description: 'Schutz'},
			{adjectiveEnding: 'es', description: 'Versteck'},
			{adjectiveEnding: 'e', description: 'Hütte'},
			{adjectiveEnding: 'es', description: 'Häuschen'},
		]
	},
	{
		// 3 * 3
		key: 'amenity,bench,material',
		total: 8706,
		biggestCluster: 1008,
		clusters: 326,
		adjectives: ['', 'fein', 'angenehm'],
		descriptions: [
			{adjectiveEnding: 'e', description: 'Rastbank'},
			{adjectiveEnding: 'er', description: 'Sitzplatz'},
			{adjectiveEnding: 'er', description: 'Platz'},
		]
	},
	{
		// 3 * 3
		key: 'amenity,hunting_stand,shelter,yes,height',
		total: 7783,
		biggestCluster: 1008,
		clusters: 148,
		adjectives: ['', 'schützend', 'sicher'],
		descriptions: [
			{adjectiveEnding: 'es', description: 'Versteck' },
			{adjectiveEnding: 'er', description: 'Hochsitz'},
			{adjectiveEnding: 'er', description: 'Hochstand'},
		]
	},
	{
		// 3 * 3
		key: 'historic,memorial',
		total: 6908,
		biggestCluster: 986,
		clusters: 251,
		adjectives: ['', 'historisch', 'honorig'],
		descriptions: [
			{adjectiveEnding: 'es', description: 'Denkmal'},
			{adjectiveEnding: 'e', description: 'Gedenkstätte'},
			{adjectiveEnding: 'es', description: 'Monument'},
		]
	},
	{
		// 3 * 3
		key: 'amenity,shelter,shelter_type,public_transport',
		total: 5027,
		biggestCluster: 904,
		clusters: 219,
		adjectives: ['', 'belebt', 'lebhaft'],
		descriptions: [
			{adjectiveEnding: 'er', description: 'Bahnhof'},
			{adjectiveEnding: 'e', description: 'Haltestelle'},
			{adjectiveEnding: 'e', description: 'Station'},
		]
	},
	{
		// 3 * 3
		key: 'amenity,clock',
		total: 5470,
		biggestCluster: 863,
		clusters: 187,
		adjectives: ['', 'gewaltig', 'mächtig'],
		descriptions: [
			{adjectiveEnding: 'e', description: 'Turmuhr'},
			{adjectiveEnding: 'e', description: 'Uhr'},
			{adjectiveEnding: 'es', description: 'Zeitmessgerät'},
		]
	},
	{
		// 3 * 3
		key: 'amenity,hunting_stand,height',
		total: 5019,
		biggestCluster: 851,
		clusters: 174,
		adjectives: ['', 'luftig', 'edl'],
		descriptions: [
			{adjectiveEnding: 'er', description: 'Hochstand'},
			{adjectiveEnding: 'er', description: 'Schutz'},
			{adjectiveEnding: 'es', description: 'Versteck'},
		]
	},
	{
		// 3 * 3
		key: 'amenity,hunting_stand,shelter',
		total: 5721,
		biggestCluster: 835,
		clusters: 174,
		adjectives: ['', 'mystisch', 'schattig'],
		descriptions: [
			{adjectiveEnding: 'er', description: 'Stand'},
			{adjectiveEnding: 'er', description: 'Unterschlupf'},
			{adjectiveEnding: 'er', description: 'Bunker'},
		]
	},
	{
		// 3 * 3
		key: 'amenity,bench,backrest,yes,material',
		total: 7175,
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
		biggestCluster: 694,
		clusters: 172,
		adjectives: ['', 'charmant', 'lokal'],
		descriptions: [
			{adjectiveEnding: 'es', description: 'Posthaus'},
			{adjectiveEnding: 'es', description: 'Postamt'},
			{adjectiveEnding: 'es', description: 'Postgebäude'},
		]
	},
	{
		// 3 * 3
		key: 'amenity,fast_food',
		total: 1989,
		biggestCluster: 627,
		clusters: 162,
		adjectives: ['', 'ulkig', 'einladend'],
		descriptions: [
			{adjectiveEnding: 'er', description: 'Gasthof'},
			{adjectiveEnding: 'e', description: 'Gaststätte'},
			{adjectiveEnding: 'es', description: 'Wirtshaus'},
		]
	},
	{
		// 3 * 3
		key: 'historic,memorial,memorial',
		total: 3667,
		biggestCluster: 603,
		clusters: 212,
		adjectives: ['', 'bedeutungsvoll', 'altertümlich'],
		descriptions: [
			{adjectiveEnding: 'e', description: 'Denkstätte'},
			{adjectiveEnding: 'er', description: 'Schauplatz'},
			{adjectiveEnding: 'er', description: 'Ort'},
		]
	},
	{
		// 3 * 3
		key: 'leisure',
		total: 1912,
		biggestCluster: 580,
		clusters: 150,
		adjectives: ['', 'fröhlich', 'erheiternd'],
		descriptions: [
			{adjectiveEnding: 'er', description: 'Festplatz'},
			{adjectiveEnding: 'e', description: 'Spielstätte'},
			{adjectiveEnding: 'e', description: 'Raststätte'},
		]
	},
	{
		// 3 * 3
		key: '',
		total: 2102,
		biggestCluster: 568,
		clusters: 123,
		adjectives: ['', 'mystisch', 'kurios'],
		descriptions: [
			{adjectiveEnding: 'er', description: 'Ort'},
			{adjectiveEnding: 'er', description: 'Platz'},
			{adjectiveEnding: 'e', description: 'Gegend'},
		]
	},
	{
		// 3 * 3
		key: 'leisure,picnic_table,covered',
		total: 3198,
		biggestCluster: 480,
		clusters: 221,
		adjectives: ['', 'einladend', 'annehmbar'],
		descriptions: [
			{adjectiveEnding: 'er', description: 'Picknick-Tisch'},
			{adjectiveEnding: 'er', description: 'Brotzeitplatz'},
			{adjectiveEnding: 'er', description: 'Tisch'},
		]
	},
	{
		// 3 * 3
		key: 'historic',
		total: 1075,
		biggestCluster: 468,
		clusters: 97,
		adjectives: ['', 'ehrwürdig', 'historisch'],
		descriptions: [
			{adjectiveEnding: 'e', description: 'Stätte'},
			{adjectiveEnding: 'er', description: 'Ort'},
			{adjectiveEnding: 'er', description: 'Platz'},
		]
	},
	{
		// 2 * 2
		key: 'leisure,playground,access',
		total: 3968,
		biggestCluster: 443,
		clusters: 169,
		adjectives: ['', 'mystisch'],
		descriptions: [
			{adjectiveEnding: 'er', description: 'Spielplatz'},
			{adjectiveEnding: 'e', description: 'Spielstätte'},
		]
	},
	{
		// 2 * 2
		key: 'amenity,bench,backrest,no,material',
		total: 4921,
		biggestCluster: 422,
		clusters: 218,
		adjectives: ['', 'ungemütlich'],
		descriptions: [
			{adjectiveEnding: 'e', description: 'Sitzbank'},
			{adjectiveEnding: 'e', description: 'Bank'}
		]
	},
	{
		// 2 * 2
		key: 'tourism,picnic_site,fireplace',
		total: 1638,
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
		biggestCluster: 359,
		clusters: 80,
		adjectives: ['', 'erfrischend'],
		descriptions: [
			{adjectiveEnding: 'er', description: 'Trinkwasserbrunnen'},
			{adjectiveEnding: 'e', description: 'Wasserquelle'},
		]
	},
	{
		// 2 * 2
		key: 'tourism,viewpoint,direction',
		total: 2721,
		biggestCluster: 355,
		clusters: 166,
		adjectives: ['', 'anmutig'],
		descriptions: [
			{adjectiveEnding: 'er', description: 'Aussichtspunkt'},
			{adjectiveEnding: 'e', description: 'Stätte'},
		]
	},
	{
		// 2 * 2
		key: 'amenity,shelter,bench',
		total: 442,
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
		biggestCluster: 235,
		clusters: 73,
		adjectives: ['', 'ruhig'],
		descriptions: [
			{adjectiveEnding: 'e', description: 'Bank'},
			{adjectiveEnding: 'er', description: 'Rastplatz'}
		]
	},
	{
		// 1 * 1
		key: 'amenity,bench,backrest',
		total: 132,
		biggestCluster: 68,
		clusters: 11,
		adjectives: [''],
		descriptions: [{adjectiveEnding: 'e', description: 'Sitzbank'}]
	},
];