const { generateRandomIntBelow, generateRandomIntBetween, selectRandomArrayElement, distributedRandomInt } = require('./random');
const { generateStreetName } = require('./names');

// \\\\\\\\\\\\ //
//   settings   //
// \\\\\\\\\\\\ //

const verticalLimit = 25000;

// state width in thousandths of a degree
const columnMin = 4000;
const columnMax = 10000;
const columnSkew = 1.5;

// multiplier to determine minimum area for
// neighborhood rect relative to listing count
const minAreaMultiplier = 50;

// neighborhood height in thousandths of a degree
const rowMax = 150;
const rowMin = 1000;
const rowSkew = 1.3;

// \\\\\\\\\\\\\\\\\\\\ //
//   location helpers   //
// \\\\\\\\\\\\\\\\\\\\ //

// \\\\\\\\\\\\\\\\\\\\\\ //
//   ListingGrid -        //
//   generates unique     //
//   coordinates for      //
//   every listing within //
//   a neighborhood       //
// \\\\\\\\\\\\\\\\\\\\\\\//

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

// \\\\\\\\\\\\\\\\\\\\\\ //
//   CityStreets  -       //
//  generates list of     //
//  streets for each      //
//  city and prevents     //
//  duplicate addresses   //
//  within city           //
// \\\\\\\\\\\\\\\\\\\\\\\//

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

// \\\\\\\\\\\\\\\\\\\\\\\\\\ //
//   CountryGrid  -           //
//  keep track of overall     //
//  country grid. Coordinates //
//  are in thousandths of     //
//  a degree unless converted //
// to geospatial.             //
// \\\\\\\\\\\\\\\\\\\\\\\\\\\//

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

// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ //
//   Zipcode  -                   //
//  Simple zipcode generator      //
//  with variable incrementation  //
// to mimic realworld zipcode     //
//  distribution                  //
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\//

const Zipcode = function Zipcode(start = 10000) {
  this.current = start;
};

Zipcode.prototype.getZipAndIncrement = function getZipAndIncrement() {
  const zip = this.current;
  this.current += generateRandomIntBetween(1, 4);
  return zip;
};

module.exports = {
  ListingGrid, CityStreets, CountryGrid, Zipcode,
};
