const { v4: uuidv4 } = require('uuid');
const { Zipcode, CityStreets } = require('./lib/location');
const { generateRandomIntBetween, distributedRandomInt } = require('./lib/random');
const { generateNeighborhoodName } = require('./lib/names');
const generateListings = require('./listings');

const neighborhoodCSVData = [];
const neighborhoodFields = ['id', 'cityId', 'zipcode', 'name'];
neighborhoodCSVData.push(neighborhoodFields);

// \\\\\\\\\\\\ //
//   settings   //
// \\\\\\\\\\\\ //

// per city
const minStreets = 20;
const maxStreets = 100;

// per neighborhood
const minListings = 0;
const maxListings = 600;
const listingSkew = 2;

const currentZipcode = new Zipcode();

// \\\\\\\\\\\\\ //
//   generator   //
// \\\\\\\\\\\\\ //

const generateNeighborhoods = (cityId, count, layout) => {
  const streetCount = generateRandomIntBetween(minStreets, maxStreets);
  const streets = new CityStreets(streetCount);
  for (let i = 0; i < count; i += 1) {
    const name = generateNeighborhoodName();
    const uuid = uuidv4();
    const zip = currentZipcode.getZipAndIncrement();
    const row = [uuid, cityId, zip, name];

    const listingCount = distributedRandomInt(minListings, maxListings, listingSkew);

    const grid = layout.addNeighborhood(listingCount);
    generateListings(uuid, listingCount, streets, grid);
    neighborhoodCSVData.push(row);
  }
};

module.exports = generateNeighborhoods;
