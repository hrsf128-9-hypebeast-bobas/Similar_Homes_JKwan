const db = require('./index.js');
const Listings = require('./Listings.js')
const faker = require('faker')

// const generateListing = () => {
//   return sampleListings;
// }

let results = [];
const generateListings = (size) => {
  for (let count = 1; count <= size; count++) {
    const listings = new Listings(
      {
        Image_url: faker.image.imageUrl(),
        Price: faker.commerce.price(1000000, 5000000),
        Address: faker.address.streetAddress(),
        Region: `${faker.address.city()}, ${faker.address.state()} ${faker.address.zipCode()}`,
        Bedroom_num: faker.random.number({'min': 1, 'max': 10}),
        Bathroom_num: faker.random.number({'min': 1, 'max': 10}),
        Square_footage: faker.random.number({'min': 1000, 'max': 5000}),
        Description: faker.lorem.paragraph(),
        Mortgage: faker.commerce.price(5000, 20000),
        New: faker.random.number(1),
        Price_drop: faker.random.number(1),
        Price_increase: faker.random.number(1)
      });
    results.push(listings)
  }
}

generateListings(10);

const insertSampleListings = function() {
  Listings.create(results)
    .then(() => console.log('worked'))
    .catch((err) => console.log(err))
};


insertSampleListings();

const checkSampleListings = function() {
  Listings.find((err, listing) => {
    if (err) console.log(err)
    console.log(listing, 'listings in db')
  })
}

checkSampleListings();

// module.exports = Seeds
