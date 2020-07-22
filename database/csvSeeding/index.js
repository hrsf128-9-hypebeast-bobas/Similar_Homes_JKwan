const RegionWriter = require('./regions');
const states = require('./lib/states');
const { CountryGrid } = require('./lib/location');

// \\\\\\\\\\\\\\ //
//  main method   //
// \\\\\\\\\\\\\\ //

const layout = new CountryGrid();

const regionWriter = new RegionWriter('csv/regions.csv', states, layout);

regionWriter.execute();

// add event listeners to clos all write streams at the same time ?
