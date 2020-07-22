const { v4: uuidv4 } = require('uuid');
const CsvWriter = require('./lib/CsvWriter');
const setupPrototypalMethodInheritance = require('./lib/inheritance');

const ListingWriter = function ListingWriter(filepath) {
  const fields = ['id', 'neighborhoodId', 'street', 'houseNumber', 'price', 'mortgage'];
  CsvWriter.call(this, filepath, fields, 'Listing seeding');
};

setupPrototypalMethodInheritance(ListingWriter, CsvWriter);

ListingWriter.generateListings = function generateNewAddress(
  neighborhoodId, start, count, streets, grid, processRow, continueCondition,
) {
  let index = start;
  while (continueCondition() && index < count) {
    const [street, streetNumber] = streets.generateNewAddress();
    const [latitude, longitude] = grid.generateGeoCoordinate();
    const uuid = uuidv4();
    const row = [uuid, neighborhoodId, street, streetNumber, latitude, longitude];
    processRow(row);
    index += 1;
  }
};

ListingWriter.prototype.execute = function execute(neighborhoodId, count, streets, grid) {
  this.processAndDrain((rowProcessor, continueCondition) => {
    this.generateListings(neighborhoodId, count, streets, grid, rowProcessor, continueCondition);
  });
};

module.exports = ListingWriter;
