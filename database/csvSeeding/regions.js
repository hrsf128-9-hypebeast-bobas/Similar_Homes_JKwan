const { v4: uuidv4 } = require('uuid');
const { shuffle, distributedRandomInt } = require('./lib/random');
const CityWriter = require('./cities');
const CsvWriter = require('./lib/CsvWriter');
const setupPrototypalMethodInheritance = require('./lib/inheritance');

// \\\\\\\\\\\\ //
//   settings   //
// \\\\\\\\\\\\ //

// per state
const minCities = 100;
const maxCities = 1500;
const citySkew = 1.5;

const country = 'US';

// \\\\\\\\\\\\\\\\\\\ //
//   initializations   //
// \\\\\\\\\\\\\\\\\\\ //

const cityWriter = new CityWriter();

// \\\\\\\\\\\\\ //
//   generator   //
// \\\\\\\\\\\\\ //

const RegionWriter = function RegionWriter(filepath, states, layout) {
  const fields = ['id', 'name', 'abbreviation', 'country'];
  CsvWriter.call(this, filepath, fields, 'State seeding');
  this.index = 0;
  this.order = [];
  this.total = states.length;
  this.layout = layout;
  this.regions = states;
  this.initialize();
};

setupPrototypalMethodInheritance(RegionWriter, CsvWriter);

RegionWriter.prototype.initialize = function initialize() {
  const order = [];
  for (let i = 1; i <= 48; i += 1) {
    order.push(i);
  }
  this.order = shuffle(order);
};

RegionWriter.prototype.getNextRegion = function getNextRegion() {
  return this.regions[this.order[this.index]];
};

RegionWriter.prototype.generateStateData = function generateStateData(
  processRow, continueCondition,
) {
  while (continueCondition() && this.index < this.total) {
    const [abbreviation, name] = this.getNextRegion();
    const uuid = uuidv4();
    const row = [uuid, name, abbreviation, country];
    const cityCount = distributedRandomInt(minCities, maxCities, citySkew);
    cityWriter.execute(uuid, cityCount, this.layout);
    processRow(row);
    this.index += 1;
  }
};

RegionWriter.prototype.execute = function execute() {
  this.processAndDrain((processRow, continueCondition) => {
    this.generateStateData(processRow, continueCondition);
    if (this.index === this.total) {
      this.end();
      cityWriter.end();
    }
  });
};

module.exports = RegionWriter;
