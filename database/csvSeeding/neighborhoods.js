const { v4: uuidv4 } = require('uuid');
const { Zipcode, CityStreets } = require('./lib/location');
const { generateRandomIntBetween, distributedRandomInt } = require('./lib/random');
const { generateNeighborhoodName } = require('./lib/names');
const { ListingGenerator, listingWriter } = require('./listings');
const CsvWriter = require('./CsvWriter');

// \\\\\\\\\\\\\\\\\\\ //
//   initializations   //
// \\\\\\\\\\\\\\\\\\\ //

const fields = ['id', 'cityId', 'zipcode', 'name'];
const neighborhoodWriter = new CsvWriter('neighborhoods', fields, 'Neighborhood seeding');

// \\\\\\\\\\\\ //
//   settings   //
// \\\\\\\\\\\\ //

// per city
// const minStreets = 5;
// const maxStreets = 6;

// // per neighborhood
// const minListings = 1;
// const maxListings = 5;
// const listingSkew = 2;

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

const NeighborhoodGenerator = function NeighborhoodGenerator(
  stream, cityId, count, layout, userGenerator,
) {
  this.stream = stream;
  this.index = 0;
  this.cityId = cityId;
  this.count = count;
  this.layout = layout;
  const streetCount = generateRandomIntBetween(minStreets, maxStreets);
  this.streets = new CityStreets(streetCount);
  this.userGenerator = userGenerator;
};

NeighborhoodGenerator.prototype.generateRows = function generateRows(
  processRow = () => {}, shouldContinue = () => true, final,
) {
  while (shouldContinue() && this.index < this.count - 1) {
    const row = this.generateNeighborhood();
    this.index += 1;
    processRow(row);
  }
  if (shouldContinue() && this.index === this.count - 1) {
    const row = this.generateNeighborhood(final);
    this.index += 1;
    processRow(row, final);
  }
};

NeighborhoodGenerator.prototype.generateNeighborhood = function generateNeighborhood(final) {
  const name = generateNeighborhoodName();
  const uuid = uuidv4();
  const zip = currentZipcode.getZipAndIncrement();
  const listingCount = distributedRandomInt(minListings, maxListings, listingSkew);
  const grid = this.layout.addNeighborhood(listingCount);
  const listingGenerator = new ListingGenerator(
    listingWriter, uuid, listingCount, this.streets, grid, this.userGenerator,
  );
  listingGenerator.execute(final);
  const row = [uuid, this.cityId, zip, name];
  return row;
};

NeighborhoodGenerator.prototype.execute = function execute(final) {
  this.stream.writeRowsWithDrain((processRows, shouldContinue) => {
    this.generateRows(processRows, shouldContinue, final);
  });
};

module.exports = { neighborhoodWriter, NeighborhoodGenerator };
