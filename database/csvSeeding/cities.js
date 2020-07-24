const { v4: uuidv4 } = require('uuid');
const { neighborhoodWriter, NeighborhoodGenerator } = require('./neighborhoods');
const { generateCityName } = require('./lib/names');
const { distributedRandomInt } = require('./lib/random');
const CsvWriter = require('./CsvWriter');
const { userWriter, UserGenerator } = require('./users');

// \\\\\\\\\\\\\\\\\\\ //
//   initializations   //
// \\\\\\\\\\\\\\\\\\\ //

const fields = ['id', 'regionId', 'name'];
const cityWriter = new CsvWriter('cities', fields, 'City seeding');

// \\\\\\\\\\\\ //
//   settings   //
// \\\\\\\\\\\\ //

// per city
// this will produce a mean of 2 neighborhoods per city
// const minNeighborhoods = 1;
// const maxNeighborhoods = 2;
// const neighborhoodSkew = 3;

// const minUsers = 1;
// const maxUsers = 3;
// const userSkew = 1.5;

const minNeighborhoods = 1;
const maxNeighborhoods = 20;
const neighborhoodSkew = 3;

const minUsers = 0;
const maxUsers = 2000;
const userSkew = 1.5;

// \\\\\\\\\\\\\ //
//   generator   //
// \\\\\\\\\\\\\ //

const CityGenerator = function CityGenerator(stream, regionId, count, layout) {
  this.stream = stream;
  this.index = 0;
  this.regionId = regionId;
  this.count = count;
  this.layout = layout;
};

CityGenerator.prototype.generateRows = function generateRows(
  processRow, shouldContinue, final,
) {
  while (shouldContinue() && this.index < this.count - 1) {
    const row = this.generateCity();
    this.index += 1;
    processRow(row);
  }
  if (shouldContinue() && this.index === this.count - 1) {
    const row = this.generateCity(final);
    this.index += 1;
    processRow(row, final);
  }
};

CityGenerator.prototype.generateCity = function generateCity(final) {
  const name = generateCityName();
  const uuid = uuidv4();
  const userCount = distributedRandomInt(
    minUsers, maxUsers, userSkew,
  );
  const userGenerator = new UserGenerator(userWriter, userCount);
  userGenerator.execute(final);
  const neighborhoodCount = distributedRandomInt(
    minNeighborhoods, maxNeighborhoods, neighborhoodSkew,
  );
  const neighborhoodGenerator = new NeighborhoodGenerator(
    neighborhoodWriter, uuid, neighborhoodCount, this.layout, userGenerator,
  );
  neighborhoodGenerator.execute(final);
  const row = [uuid, this.regionId, name];
  return row;
};

CityGenerator.prototype.execute = function execute(final) {
  this.stream.writeRowsWithDrain(
    (processRow, shouldContinue) => this.generateRows(processRow, shouldContinue, final),
  );
};

module.exports = { cityWriter, CityGenerator };
