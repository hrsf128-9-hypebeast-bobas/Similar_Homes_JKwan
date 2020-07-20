const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const states = require('./lib/states');
const { CountryGrid } = require('./lib/location');
const { shuffle, distributedRandomInt } = require('./lib/random');
const generateCities = require('./cities');

// \\\\\\\\\\\\\\\\\\ //
//   csv writestream  //
// \\\\\\\\\\\\\\\\\\ //

console.time('Seeding states');

const filepath = './csv/states.csv';

const stream = fs.createWriteStream(filepath)
  .on('error', (err) => {
    console.log(err);
  })
  .on('finish', () => {
    console.timeEnd('Seeding states');
  });

const toCsvRow = (array) => `${array.join(',')}\n`;
const stateFields = ['id', 'name', 'abbreviation', 'country'];

stream.write(toCsvRow(stateFields));

// \\\\\\\\\\\\ //
//   settings   //
// \\\\\\\\\\\\ //

// per state
const minCities = 100;
const maxCities = 1500;
const citySkew = 1.5;

// \\\\\\\\\\\\\ //
//   generator   //
// \\\\\\\\\\\\\ //

const generateStates = () => {
  const layout = new CountryGrid();

  const stateOrder = [];
  for (let i = 1; i < 51; i += 1) {
    stateOrder.push(i);
  }
  shuffle(stateOrder);

  let ok = true;
  let statesProcessed = 0;
  const { length: totalStates } = states;

  const writeStates = () => {
    while (ok && statesProcessed < totalStates) {
      const index = stateOrder[statesProcessed];
      const [abbreviation, name] = states[index];
      const uuid = uuidv4();
      const properties = [uuid, name, abbreviation, 'USA'];
      const cityCount = distributedRandomInt(minCities, maxCities, citySkew);
      generateCities(uuid, cityCount, layout);
      ok = stream.write(toCsvRow(properties));
      statesProcessed += 1;
    }
    if (statesProcessed < totalStates) {
      stream.once('drain', () => {
        writeStates();
      });
    } else {
      stream.end();
    }
  };

  writeStates();
};

module.exports = generateStates;
