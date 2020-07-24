// @flow
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const faker = require('faker');
const path = require('path');
let listingImage = 'https://similarhomelistings.s3-us-west-1.amazonaws.com/ListingImage';

const writeToCsv = (filename, categories, rowFunction, rowCount) => {
  console.time('Writing to csv');

  const stream = fs.createWriteStream(filename);
  const toCsvRow = (array) => `${array.join(',')}\n`;

  stream.on('error', (err) => {
    console.log(err);
  });

  stream.on('finish', () => {
    console.timeEnd('Writing to csv');
  });

  let i = 0;

  const fields = toCsvRow(categories);
  stream.write(fields, 'utf8');

  const write = () => {
    let ok = true;
    while (i < rowCount && ok) {
      const row = toCsvRow(rowFunction(i));
      ok = stream.write(row, 'utf8');
      i += 1;
    }
    if (i === rowCount) {
      stream.end();
    }
    if (i < rowCount) {
      stream.once('drain', () => {
        write();
      });
    }
  }

  write();
};

const categories = [
  'imageUrl',
  'price',
  'address',
  'region',
  'bedroomNum',
  'bathroomNum',
  'squareFootage',
  'description',
  'mortgage',
  'new',
  'priceChange',
];

const rowFunction = (index) => {
  const count = index % 10;
  return [
    `${listingImage}${count}.jpg`,
    faker.commerce.price(1000000, 5000000),
    `${faker.address.streetAddress()} ${faker.address.streetSuffix()}`,
    `${faker.address.city()}, ${faker.address.state()}`,
    faker.random.number({ min: 1, max: 10 }),
    faker.random.number({ min: 1, max: 10 }),
    faker.random.number({ min: 1000, max: 5000 }),
    faker.lorem.paragraph(),
    faker.commerce.price(5000, 20000),
    faker.random.number(1),
    faker.random.number(2),
  ];
}

writeToCsv(path.join(__dirname, 'test.csv'), categories, rowFunction, 10000000);


module.exports = writeToCsv;