const { v4: uuidv4 } = require('uuid');
const NeighborhoodWriter = require('./neighborhoods');
const { generateCityName } = require('./lib/names');
const { distributedRandomInt } = require('./lib/random');
const CsvWriter = require('./lib/CsvWriter');
const setupPrototypalMethodInheritance = require('./lib/inheritance');

// \\\\\\\\\\\\\\\\\\\ //
//   initializations   //
// \\\\\\\\\\\\\\\\\\\ //

const neighborhoodWriter = new NeighborhoodWriter('csv/neighborhoods.csv');

const fields = ['id', 'regionId', 'name'];
const cityWriter = new CsvWriter(fields, 'csv/cities.csv', 'City seeding');

// \\\\\\\\\\\\ //
//   settings   //
// \\\\\\\\\\\\ //

// per city
const minNeighborhoods = 1;
const maxNeighborhoods = 20;
const neighborhoodSkew = 3;

// \\\\\\\\\\\\\ //
//   generator   //
// \\\\\\\\\\\\\ //

const CityGenerator = function CityGenerator(stream, layout) {
  this.stream = stream;
  this.index = 0;
  this.layout = layout;
};

setupPrototypalMethodInheritance(CityGenerator, CsvWriter);

CityGenerator.prototype.generateCities = function generateCities(
  regionId, start, count, processRow, continueCondition,
) {
  let index = start;
  while (continueCondition() && index < count) {
    const name = generateCityName();
    const uuid = uuidv4();
    const row = [uuid, regionId, name];
    const neighborhoodCount = distributedRandomInt(
      minNeighborhoods, maxNeighborhoods, neighborhoodSkew,
    );
    neighborhoodWriter.execute(uuid, neighborhoodCount, this.layout);
    processRow(row);
    index += 1;
  }
};

CityGenerator.prototype.execute = function execute(regionId, count, layout) {
  const start = 0;
  this.stream.processRowsWithDrain((rowProcessor, continueCondition) => {
    this.generateCities(regionId, count, layout, rowProcessor, continueCondition);
  });
};

module.exports = CityGenerator;
