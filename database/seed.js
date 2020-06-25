const db = require('./index.js');
const Listings = require('./Listings.js')
const faker = require('faker')


// create listing for similar and nearby homes
let similarListingResults = [];
let nearbyListingResults = [];
const generateListings = (size) => {
  for (let count = 1; count <= size; count++) {

    const similarListings = new Listings(
      {
        Image_url: faker.image.imageUrl(),
        Price: faker.commerce.price(1000000, 5000000),
        Address: `${faker.address.streetAddress()} ${faker.address.streetSuffix()}`,
        Region: `${faker.address.city()}, ${faker.address.state()}`,
        Bedroom_num: faker.random.number({'min': 1, 'max': 10}),
        Bathroom_num: faker.random.number({'min': 1, 'max': 10}),
        Square_footage: faker.random.number({'min': 1000, 'max': 5000}),
        Description: faker.lorem.paragraph(),
        Mortgage: faker.commerce.price(5000, 20000),
        New: faker.random.number(1),
        Price_change: faker.random.number(2),
      });
    similarListingResults.push(similarListings);

    // const nearbyListings = new Listings(
    //   {
    //     Image_url: faker.image.imageUrl(),
    //     Price: faker.commerce.price(1000000, 5000000),
    //     Address: `${faker.address.streetAddress()} ${faker.address.streetSuffix()}`,
    //     Region: `${faker.address.city()}, ${faker.address.state()}`,
    //     Bedroom_num: faker.random.number({'min': 1, 'max': 10}),
    //     Bathroom_num: faker.random.number({'min': 1, 'max': 10}),
    //     Square_footage: faker.random.number({'min': 1000, 'max': 5000}),
    //     Description: faker.lorem.paragraph(),
    //     Mortgage: faker.commerce.price(5000, 20000),
    //     New: faker.random.number(1),
    //     Price_drop: faker.random.number(1),
    //     Price_increase: faker.random.number(1)
    //   });
    // nearbyListingResults.push(nearbyListings);
  }
}

generateListings(10);

const insertSampleListings = function() {
  Listings.create(similarListingResults)
    .then(() => console.log('worked'))
    .catch((err) => console.log(err))
  // Listings.create(nearbyListingResults)
  //   .then(() => console.log('worked'))
  //   .catch((err) => console.log(err))
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
