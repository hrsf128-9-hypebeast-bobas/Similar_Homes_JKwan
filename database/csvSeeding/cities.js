const { v4: uuidv4 } = require('uuid');
const generateNeighborhoods = require('./neighborhoods');
const { generateCityName } = require('./lib/names');
const { distributedRandomInt } = require('./lib/random');

const cityCSVData = [];
const cityFields = ['id', 'stateId', 'name'];
cityCSVData.push(cityFields);

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

const generateCities = (stateId, count, layout) => {
  for (let i = 0; i < count; i += 1) {
    const name = generateCityName();
    const uuid = uuidv4();
    const row = [uuid, stateId, name];
    const neighborhoodCount = distributedRandomInt(
      minNeighborhoods, maxNeighborhoods, neighborhoodSkew,
    );
    generateNeighborhoods(uuid, neighborhoodCount, layout);
    cityCSVData.push(row);
  }
};

module.exports = generateCities;
