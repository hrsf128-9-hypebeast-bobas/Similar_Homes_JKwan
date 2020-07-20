const { v4: uuidv4 } = require('uuid');
const {
  generateCityName, generateNeighborhoodName, generateStreetName,
} = require('./helpers');
const {
  shuffle, distributedRandomInt, generateRandomIntBetween, generateRandomIntBelow,
  // generateRandomBoolean,
  selectRandomArrayElement,
} = require('./random');
const states = require('./states');

// \\\\\\\\\\\\\\ //
//   global var   //
// \\\\\\\\\\\\\\ //

const stateCSVData = [];
const stateFields = ['id', 'name', 'abbreviation'];
stateCSVData.push(stateFields);

const cityCSVData = [];
const cityFields = ['id', 'stateId', 'name'];
cityCSVData.push(cityFields);

const neighborhoodCSVData = [];
const neighborhoodFields = ['id', 'cityId', 'zipcode', 'name'];
neighborhoodCSVData.push(neighborhoodFields);

const listingCSVData = [];
const listingFields = ['id', 'neighborhoodId', 'street', 'houseNumber', 'price', 'mortgage'];
listingCSVData.push(listingFields);

let currentZipcode;

// const verticalLimit = 25000;

// const stateCount = 48;

// // state width in thousandths of a degree
// const columnMin = 4000;
// const columnMax = 10000;
// const columnSkew = 1.5;

// // per state
// const minCities = 100;
// const maxCities = 1500;
// const citySkew = 1.5;

// // per city
// const minNeighborhoods = 1;
// const maxNeighborhoods = 20;
// const neighborhoodSkew = 3;

// // per city
// const minStreets = 20;
// const maxStreets = 100;

// // per neighborhood
// const minListings = 0;
// const maxListings = 600;
// const listingSkew = 2;

// // multiplier to determine minimum area for
// // neighborhood rect relative to listing count
// const minAreaMultiplier = 50;

// // neighborhood height in thousandths of a degree
// const rowMax = 150;
// const rowMin = 1000;
// const rowSkew = 1.3;

const verticalLimit = 2500;
const stateCount = 3;

// state width in thousandths of a degree
const columnMin = 400;
const columnMax = 1000;
const columnSkew = 1.5;

// per state
const minCities = 1;
const maxCities = 5;
const citySkew = 1.5;

// per city
const minNeighborhoods = 1;
const maxNeighborhoods = 5;
const neighborhoodSkew = 3;

// per city
const minStreets = 2;
const maxStreets = 10;

// per neighborhood
const minListings = 0;
const maxListings = 60;
const listingSkew = 2;

// multiplier to determine minimum area for
// neighborhood rect relative to listing count
const minAreaMultiplier = 50;

// neighborhood height in thousandths of a degree
const rowMax = 15;
const rowMin = 100;
const rowSkew = 1.3;

// \\\\\\\\\\\ //
//   helpers   //
// \\\\\\\\\\\ //

// zipcode constructor that randomly
// increments between 1 - 3
const Zipcode = function Zipcode(start = 10000) {
  this.current = start;
};

Zipcode.prototype.getZipAndIncrement = function getZipAndIncrement() {
  const zip = this.current;
  this.current += generateRandomIntBetween(1, 4);
  return zip;
};

// city streets constructor to generate
// list of streets for each city and prevent
// duplicate addresses within city
const CityStreets = function CityStreets(count) {
  this.names = [];
  this.addresses = {};
  if (count) {
    this.generateStreetNames(count);
  }
};

CityStreets.prototype.generateStreetNames = function generateStreetNames(count) {
  let iterationsLeft = count;
  while (iterationsLeft) {
    let name = generateStreetName();
    while (this.addresses[name]) {
      name = generateStreetName();
    }
    this.addresses[name] = {};
    this.names.push(name);
    iterationsLeft -= 1;
  }
};

CityStreets.prototype.random = function random() {
  return selectRandomArrayElement(this.names);
};

CityStreets.prototype.addressIsOccupied = function addressIsOccupied(street, streetNumber) {
  return this.addresses[street][streetNumber];
};

CityStreets.prototype.markAddressOccupied = function markAddressOccupied(street, streetNumber) {
  this.addresses[street][streetNumber] = true;
};

CityStreets.prototype.generateStreetNumber = function generateStreetNumber() {
  return generateRandomIntBelow(9999) + 1;
};

// address generation - no duplicate
// addresses within city
CityStreets.prototype.generateNewAddress = function generateNewAddress() {
  const street = this.random();
  let streetNumber = this.generateStreetNumber();
  while (this.addressIsOccupied(street, streetNumber)) {
    streetNumber = this.generateStreetNumber();
  }
  this.markAddressOccupied(street, streetNumber);
  return [street, streetNumber];
};

// constructor for listingGrid that generates
// unique coordinates for every listing within
// a neighborhood
const ListingGrid = function ListingGrid(min, max) {
  [this.minX, this.minY] = min;
  [this.maxX, this.maxY] = max;
  this.width = this.maxX - this.minX;
  this.height = this.maxY - this.minY;
  this.grid = new Uint8Array(this.width * this.height);
};

ListingGrid.prototype.coordinateIsOccupied = function coordinateIsOccupied(col, row) {
  return this.grid[this.width * row + col];
};

ListingGrid.prototype.randomCoordinate = function randomCoordinate() {
  const col = generateRandomIntBelow(this.width);
  const row = generateRandomIntBelow(this.height);
  return [col, row];
};

ListingGrid.prototype.generateGeoCoordinate = function generateGeoCoordinate() {
  let [col, row] = this.randomCoordinate();
  while (this.coordinateIsOccupied(col, row)) {
    [col, row] = this.randomCoordinate();
  }
  this.grid[this.width * row + col] = 1;
  return this.convertToGeospatial(col, row);
};

ListingGrid.prototype.convertToGeospatial = function convertToGeospatial(col, row) {
  // need offsetX and offsetY.
  // at bottom left corner offset is 25.118, -124.73
  // (x, y, offsetX = 25.118, offsetY = -124.73) => (
  //   [x / 1000 + offsetX, y / 1000 + offsetY]
  const [offsetX, offsetY] = [25.118, -124.73];
  const x = (col + this.minX) / 1000;
  const y = (row + this.minY) / 1000;
  return [x + offsetX, y + offsetY];
};

// constructor to keep track of overall country
// grid. Coordinates are in thousandths of a
// degree unless converted to geospatial.

const CountryGrid = function CountryGrid(min = [0, 0]) {
  const max = [min[0], verticalLimit];
  // for determining overflow/ overall layout
  [this.minX, this.minY] = min;
  [this.maxX, this.maxY] = max;
  // for state placement
  [this.stateMinX, this.stateMinY] = min;
  [this.stateMaxX, this.stateMaxY] = max;
  // for neighborhood placement
  [this.currentMinX, this.currentMinY] = min;
  [this.currentMaxX, this.currentMaxY] = min;
  // current state column width limit
  this.currentColumnWidth = 0;
};

// initializes coordinates for listing placement within state
CountryGrid.prototype.addState = function addState() {
  // if first state or last state overflowed y axis then
  // place next state in new column and generate
  // new column width
  if (this.stateMaxY >= this.maxY) {
    this.stateMinX = this.maxX;
    this.stateMinY = this.minY;
    this.currentColumnWidth = distributedRandomInt(columnMin, columnMax, columnSkew);
    this.maxX += this.CurrentColumnWidth;
    this.stateMaxX = this.maxX;
  } else {
    this.stateMinY = this.stateMaxY;
  }
  [this.currentMinX, this.currentMinY] = [this.stateMinX, this.stateMinY];
};

// generates rectangle for neighborhood grid
CountryGrid.prototype.addNeighborhood = function addNeighborhood(listingCount) {
  // if width has overflowed then move on to next
  // row. if overflow is biggest in column so
  // far then record as maxX. reset x to start of
  // column and Y to top of last row
  if (this.currentMaxX >= this.stateMaxX) {
    this.maxX = Math.max(this.maxX, this.currentMaxX);
    this.currentMinX = this.stateMinX;
    this.currentMinY = this.currentMaxY;
  } else {
    this.currentMinX = this.currentMaxX;
  }
  // if at column start in any row then determine row height.
  let rowHeight;
  if (this.currentMinX === this.stateMinX) {
    // generate row height.
    // should keep neighborhood dimensions reasonable, ie not excessively wide or tall
    rowHeight = distributedRandomInt(rowMax, rowMin, rowSkew);
    this.currentMaxY = this.currentMinY + rowHeight;
    this.stateMaxY = this.currentMaxY;
  } else {
    // calculate width based on current row height from currentMaxY
    rowHeight = this.currentMaxY - this.currentMinY;
  }

  const minArea = listingCount * minAreaMultiplier;
  // width can independently be content-aware if
  // it is instead calculated based on target
  // area:listingCount ratio
  let neighborhoodWidth = distributedRandomInt(rowMax, rowMin, rowSkew);
  while (neighborhoodWidth * rowHeight < minArea) {
    neighborhoodWidth = distributedRandomInt(rowMax, rowMin, rowSkew);
  }
  this.currentMaxX += neighborhoodWidth;

  const min = [this.currentMinX, this.currentMinY];
  const max = [this.currentMaxX, this.currentMaxY];
  return new ListingGrid(min, max);
};

// \\\\\\\\\\\\\\ //
//   generators   //
// \\\\\\\\\\\\\\ //

// const generateUsers = () => {

// };

// const generateAgents = () => {

// };

// const generateLikedListings = () => {

// };

// const generateTags = () => {

// };

// const generateListingTags = () => {

// };

const generateListings = (neighborhoodId, count, streets, grid) => {
  for (let i = 0; i < count; i += 1) {
    const [street, streetNumber] = streets.generateNewAddress();
    const [latitude, longitude] = grid.generateGeoCoordinate();
    const uuid = uuidv4();
    const row = [uuid, neighborhoodId, street, streetNumber, latitude, longitude];
    listingCSVData.push(row);
  }
};

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

// gen state
const generateStates = () => {
  const layout = new CountryGrid();

  const stateOrder = [];
  for (let i = 1; i < 51; i += 1) {
    stateOrder.push(i);
  }
  shuffle(stateOrder);

  for (let i = 0; i < stateCount; i += 1) {
    const [abbreviation, name] = states[stateOrder[i]];
    const uuid = uuidv4();
    const row = [uuid, name, abbreviation];
    const cityCount = distributedRandomInt(minCities, maxCities, citySkew);
    generateCities(uuid, cityCount, layout);
    stateCSVData.push(row);
  }
};

// \\\\\\\\\\\\\\ //
//  main method   //
// \\\\\\\\\\\\\\ //

currentZipcode = new Zipcode();
generateStates();

console.log(stateCSVData);
console.log(listingCSVData);

// // cities
// // avg 500 per state
// // max 1250 ?
// // min 200 ?
// let minX = 0;
// let minY = 0;
// let maxX = 0;
// let maxY = 0;
// const zip = 10000;

// const countrySoftLimitY = 25000;

// for (let i = 0; i < 2; i += 1) {
//   const state = states[stateOrder[i]];
//   const cityCount = distributedRandomInt(100, 1500, 1.5);
//   // update to add more randomness I guess? idk

//   // times 1000 to account for x10 mapping in each direction
//   // as well as the number of avg listings
//   const stateSoftLimitY = Math.trunc(Math.sqrt(cityCount * 2)) * 1000 + minY;
//   if (minY > countrySoftLimitY) {
//     minY = 0;
//     minX = maxX;
//   }
//   let currentX = minX;
//   let currentY = minY;
//   for (let k = 0; k < cityCount; k += 1) {
//     const zipCount = distributedRandomInt(1, 20, 3);
//     let columnXVal = undefined;
//     for (let j = 0; j < zipCount; j += 1) {
//       zip += (Math.random() * 2) + 1;
//       const code = zip;
//       if (minY => stateSoftLimitY) {
//         // min Y should equal state min, not 0
//         maxY = Math.max(maxY, minY);
//         minY = 0;
//         minX = columnXVal;
//         columnXVal = undefined;
//       }
//       const zipMinX = minX;
//       const zipMinY = minY;
//       const listingCount = distributedRandomInt(0, 600, 2);
//       let zipY;
//       let zipX;
//       if (columnXVal) {
//         zipX = columnXVal;
//         zipY = listingCount * 100 / zipX;
//       } else {
//         zipY = Math.trunc(Math.sqrt(listingCount * 2)) * 10 + zipMinY;
//         zipX = listingCount * 100 / zipY;
//       }
//     }
//   }
// }

module.exports = {
  CityStreets, Zipcode, ListingGrid,
};
