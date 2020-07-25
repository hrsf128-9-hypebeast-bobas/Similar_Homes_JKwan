// @flow
const { v4: uuidv4 } = require('uuid');
const faker = require('faker');
const { generateRandomIntBetween, distributedRandomInt } = require('./lib/random');
const { tagWriter, TagGenerator } = require('./tags');
const CsvWriter = require('./CsvWriter');

// \\\\\\\\\\ //
//   writer   //
// \\\\\\\\\\ //

const tagGenerator = new TagGenerator(tagWriter);

const fields = ['id', 'neighborhoodId', 'street', 'streetNumber',
  'location', 'price', 'squareFootage', 'bedrooms',
  'bathrooms', 'description', 'postingDate', 'constructionYear', 'previousPrice',
  'likeCount'];
const listingWriter = new CsvWriter('listings', fields, 'Listing seeding');

// \\\\\\\\\\\\ //
//   settings   //
// \\\\\\\\\\\\ //

// const minLikes = 0;
// const maxLikes = 2;
// const likesSkew = 3;

// const minTags = 0;
// const maxTags = 3;
// const tagSkew = 1.5;

const minLikes = 0;
const maxLikes = 20;
const likesSkew = 3;

const minTags = 0;
const maxTags = 15;
const tagSkew = 1.5;

// \\\\\\\\\\\\\ //
//   generator   //
// \\\\\\\\\\\\\ //

const ListingGenerator = function ListingGenerator(
  stream, neighborhoodId, count, streets, grid, userGenerator,
) {
  this.stream = stream;
  this.index = 0;
  this.count = count;
  this.neighborhoodId = neighborhoodId;
  this.streets = streets;
  this.grid = grid;
  this.userGenerator = userGenerator;
};

ListingGenerator.prototype.generateRows = function generateRows(
  processRow = () => {}, shouldContinue = () => true, final,
) {
  while (shouldContinue() && this.index < this.count - 1) {
    const row = this.generateListing();
    processRow(row);
    this.index += 1;
  }
  if (shouldContinue() && this.index === this.count - 1) {
    const row = this.generateListing(final);
    processRow(row, final);
    this.index += 1;
  }
};

// 'price per square foot'
// 'price range'
// bathrooms
// bedroom
// 'lot size'

// const listing = {
//   Image_url: String,
//   Price: Number,
//   Address: String,
//   // zip code
//   City: String,
//   Region: String,
//   Bedroom_num: Number,
//   Bathroom_num: Number,
//   Square_footage: String,
//   Description: String,
//   createdAt: Date,
//   updatedAt: Date,
//   Price_change: Number,
//   // price history?
//   Likes: Number,
//   Mortgage: Number,
//   constructionDate: Date,
// };

ListingGenerator.prototype.addTags = function addTags(
  id, bedrooms, bathrooms, price, squareFootage, final,
) {
  const tagCount = distributedRandomInt(minTags, maxTags, tagSkew);
  tagGenerator.addDynamicTags('price per square foot', price / squareFootage, id);
  tagGenerator.addDynamicTags('price range', price, id);
  tagGenerator.addDynamicTags('bathrooms', bathrooms, id);
  tagGenerator.addDynamicTags('bedrooms', bedrooms, id);
  tagGenerator.addDynamicTags('lot size', squareFootage, id);
  tagGenerator.randomlyTagListing(id, tagCount);
};

ListingGenerator.prototype.generateListing = function generateListing(final) {
  const [street, streetNumber] = this.streets.generateNewAddress();
  const [latitude, longitude] = this.grid.generateGeoCoordinate();
  const location = `(${latitude},${longitude})`;
  const uuid = uuidv4();
  const price = generateRandomIntBetween(50000, 10000000);
  const squareFootage = generateRandomIntBetween(1000, 15000);
  const bathrooms = generateRandomIntBetween(1, 10);
  const bedrooms = generateRandomIntBetween(1, 10);
  const description = faker.lorem.paragraph();
  const postingDate = faker.date.past(1);
  const constructionYear = generateRandomIntBetween(1850, 2020);
  const priceDifference = generateRandomIntBetween(1000, 50000) * (distributedRandomInt(-1, 2));
  const previousPrice = price + priceDifference;
  const likeCount = distributedRandomInt(minLikes, maxLikes, likesSkew);
  this.userGenerator.likeListing(uuid, likeCount, final);
  this.addTags(uuid, bedrooms, bathrooms, price, squareFootage, final);
  const row = [
    uuid, this.neighborhoodId, street, streetNumber,
    location, price, squareFootage, bedrooms,
    bathrooms, description, postingDate, constructionYear, previousPrice,
    likeCount,
  ];
  return row;
};

ListingGenerator.prototype.execute = function execute(final) {
  this.stream.writeRowsWithDrain((processRow, shouldContinue) => {
    this.generateRows(processRow, shouldContinue, final);
  });
};

module.exports = { listingWriter, ListingGenerator };
