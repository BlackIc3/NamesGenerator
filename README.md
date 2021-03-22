# NamesGenerator

## First time setup
After cloning the repo, run `npm install` in your local repo folder to install the node modules needed. \
Also unpack the `data/germany_pois.osm.rar` in case you don't have an Osm-xml-file lying around ;)

## Usage
Run `npm start` to build and run the framework. At first, a file `out/attributes.csv` will be generated to greatly improve future loading times. \
Afterwards, a log file will be generated with the findings of the analysis alongside a TypeScript file `out/combinations.ts`. \
The program stops now, as it has done the first part. \
\
Now you have to fill all needed combinations in your `out/combinations.ts`. To check whether it is already valid or not, run `npm run validate`.
Once it is valid, run `npm start` again to generate all names.
