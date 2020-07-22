const { v4: uuidv4 } = require('uuid');
const { Zipcode, CityStreets } = require('./lib/location');
const { generateRandomIntBetween, distributedRandomInt } = require('./lib/random');
const { generateNeighborhoodName } = require('./lib/names');
const ListingWriter = require('./listings');
const CsvWriter = require('./lib/CsvWriter');
const setupPrototypalMethodInheritance = require('./lib/inheritance');

// \\\\\\\\\\\\\\\\\\\ //
//   initializations   //
// \\\\\\\\\\\\\\\\\\\ //

const listingWriter = ListingWriter('csv/listings.csv');

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

const NeighborhoodWriter = function NeighborhoodWriter(filepath) {
  const fields = ['id', 'cityId', 'zipcode', 'name'];
  CsvWriter.call(this, filepath, fields, 'Neighborhood seeding');
  this.index = 0;
};

setupPrototypalMethodInheritance(NeighborhoodWriter, CsvWriter);

NeighborhoodWriter.prototype.generateNeighborhoods = function generateNeighborhoods(
  cityId, count, layout, processRow, continueCondition,
) {
  const streetCount = generateRandomIntBetween(minStreets, maxStreets);
  const streets = new CityStreets(streetCount);

  while (continueCondition() && this.index < count) {
    const name = generateNeighborhoodName();
    const uuid = uuidv4();
    const zip = currentZipcode.getZipAndIncrement();
    const row = [uuid, cityId, zip, name];
    const listingCount = distributedRandomInt(minListings, maxListings, listingSkew);
    const grid = layout.addNeighborhood(listingCount);
    listingWriter.execute(uuid, listingCount, streets, grid);
    processRow(row);
  }
  if (this.index >= count) {
    this.index = 0;
  }
};

NeighborhoodWriter.prototype.execute = function execute(cityId, count, layout) {
  this.processAndDrain((rowProcessor, continueCondition) => {
    this.generateNeighborhoods(cityId, count, layout, rowProcessor, continueCondition);
  });
};

module.exports = NeighborhoodWriter;
