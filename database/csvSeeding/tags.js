const { v4: uuidv4 } = require('uuid');
const CsvWriter = require('./lib/CsvWriter');
const setupPrototypalMethodInheritance = require('./lib/inheritance');

const fields = ['id', 'tag', 'category'];
const tagWriter = new CsvWriter('csv/tags.csv', fields, 'Tag seeding');

// lot size
// room count

// value - compare price by sqft to nearby/ neighborhood
//

const tags = [
  'elevator',
  'fireplace',
  'attic',
  'security system',
  'valted ceiling',
  'ceiling fan',
  'great views',
  'contemporary architecture',
];

const categorizedTags = {
  'for sale': [
    'resale',
    'for sale by owner',
    'new construction',
    'foreclosures',
    'new listings',
    'open houses',
    'price reduced',
    'include pending listings',
  ],
  'floor type': [
    'hardwood',
  ],
  parking: [
    'garage',
    'parking spaces',
    'attached',
  ],
  exterior: [
    'brick vinyl',
    'stucco',
  ],
  yard: [
    'garden',
    'bbq area',
    'lawn',
  ],
  'heating fuel': [

  ],
  kitchen: [
    'refrigerator',
  ],
  'roof type': [
    'composition',
    'dishwasher',
  ],
  'laundry facilities': [
    'washer',
    'dryer',
  ],
  'tv info': [
    'cable ready',
    'satellite',
    'cable',
  ],
  'heating type': [
    'forced air',
  ],
  'cooling system': [
    'air conditioning',
  ],
  'home types': [
    'house',
    'condo',
    'townhome',
    'multi-family',
    'land',
    'mobile/manufactured',
    'other',
  ],
};

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

/*

neighborhood votes:
There are sidewalks
It's dog friendly
It's walkable to restaurants
It's walkable to grocery stores
People would walk alone at night
Streets are well-lit
Kids play outside
There's holiday spirit
Neighbors are friendly
It's quiet
They plan to stay for at least 5 years
Parking is easy
Car is needed
There's wildlife
Yards are well-kept
There are community events

crime rate
commute method?
schools

Land Use Code: Single Family ResidentialSubdivision Name: CASCADE

property tax stuff?
year
tax
assessment - land/improvements/total
*/

// const user = {
//   grossHouseholdIncome: Number,
//   likedProperties: Array,
// };

// const region = {
// /**
//  * local lgbt protections?
//  */
// };

/*
typical value by sqft vs this home
typical value vs this home

*/
