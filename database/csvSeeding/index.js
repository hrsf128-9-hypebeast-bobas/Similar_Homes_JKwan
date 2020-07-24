const { regionWriter, RegionGenerator } = require('./regions');
const states = require('./lib/states');
const { CountryGrid } = require('./lib/location');

// \\\\\\\\\\\\\\ //
//  main method   //
// \\\\\\\\\\\\\\ //

const layout = new CountryGrid();

const regionGenerator = new RegionGenerator(regionWriter, states, layout);

regionGenerator.execute();

// add event listeners to clos all write streams at the same time ?
