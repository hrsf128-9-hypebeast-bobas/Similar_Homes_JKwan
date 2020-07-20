const { v4: uuidv4 } = require('uuid');

const listingCSVData = [];
const listingFields = ['id', 'neighborhoodId', 'street', 'houseNumber', 'price', 'mortgage'];
listingCSVData.push(listingFields);

const generateListings = (neighborhoodId, count, streets, grid) => {
  for (let i = 0; i < count; i += 1) {
    const [street, streetNumber] = streets.generateNewAddress();
    const [latitude, longitude] = grid.generateGeoCoordinate();
    const uuid = uuidv4();
    const row = [uuid, neighborhoodId, street, streetNumber, latitude, longitude];
    listingCSVData.push(row);
  }
};

module.exports = generateListings;
