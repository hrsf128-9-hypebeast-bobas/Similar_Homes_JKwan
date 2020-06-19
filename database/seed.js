const db = require('./index.js');
const Listings = require('./Listings.js')
const faker = require('faker')

// const generateListings(size) {
const sampleListings = [
  {
    Image_url: faker.image.imageUrl(),
    Price: faker.commerce.price(1000000),
    Address: faker.address.streetAddress,
    Region: `${faker.address.city}, ${faker.address.state}`,
    Bedroom_num: faker.random.number(1, 10),
    Bathroom_num: faker.random.number(1, 20),
    Square_footage: faker.random.number(1000, 4000),
    Description: faker,
    Mortgage: `${faker.commerce.price(5000, 20000)}`,
    New: faker.random.number(0, 1),
    Price_drop: faker.random.number(0, 1),
    Price_increase: faker.random.number(0, 1)
  }
]

// }

const insertSampleListings = function() {
  Listings.create(sampleListings)
    .then(() => db.disconnect())
    .catch(() => console.log('failed to load'));
};

insertSampleListings();