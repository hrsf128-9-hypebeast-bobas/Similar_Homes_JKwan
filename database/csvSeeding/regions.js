const { v4: uuidv4 } = require('uuid');
const { shuffle, distributedRandomInt } = require('./lib/random');
const { cityWriter, CityGenerator } = require('./cities');
const CsvWriter = require('./CsvWriter');

// \\\\\\\\\\\\ //
//   settings   //
// \\\\\\\\\\\\ //

// per state

// const minCities = 2;
// const maxCities = 4;
// const citySkew = 1.5;

const minCities = 100;
const maxCities = 1500;
const citySkew = 1.5;

const country = 'US';

// \\\\\\\\\\\\\\\\\\\ //
//   initializations   //
// \\\\\\\\\\\\\\\\\\\ //

const fields = ['id', 'name', 'abbreviation', 'country'];
const regionWriter = new CsvWriter('regions', fields, 'Region seeding');

// \\\\\\\\\\\\\ //
//   generator   //
// \\\\\\\\\\\\\ //

const RegionGenerator = function RegionGenerator(stream, states, layout) {
  this.stream = stream;
  this.index = 0;
  this.order = [];
  this.total = states.length;
  this.layout = layout;
  this.regions = states;
  this.initialize();
};

RegionGenerator.prototype.initialize = function initialize() {
  const order = [];
  for (let i = 0; i < 48; i += 1) {
    order.push(i);
  }
  this.order = shuffle(order);
};

RegionGenerator.prototype.getNextRegion = function getNextRegion() {
  return this.regions[this.order[this.index]];
};

RegionGenerator.prototype.generateRows = function generateRows(
  processRow = () => {}, shouldContinue = () => true,
) {
  while (shouldContinue() && this.index < this.total - 2) {
    const row = this.generateRegion();
    this.index += 1;
    processRow(row);
  }
  if (shouldContinue() && this.index === this.total - 2) {
    const final = true;
    const row = this.generateRegion(final);
    this.index += 1;
    processRow(row, final);
  }
};

RegionGenerator.prototype.generateRegion = function generateRegion(final) {
  const [abbreviation, name] = this.getNextRegion();
  const uuid = uuidv4();
  const row = [uuid, name, abbreviation, country];
  const cityCount = distributedRandomInt(minCities, maxCities, citySkew);
  const cityGenerator = new CityGenerator(cityWriter, uuid, cityCount, this.layout);
  cityGenerator.execute(final);
  return row;
};

RegionGenerator.prototype.execute = function execute() {
  this.stream.writeRowsWithDrain((processRow, shouldContinue) => {
    this.generateRows(processRow, shouldContinue);
  });
};

module.exports = { regionWriter, RegionGenerator };
