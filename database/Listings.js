const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const listingSchema = new mongoose.Schema({
  Image_url: String,
  Price: Number,
  Address: String,
  Region: String,
  Bedroom_num: Number,
  Bathroom_num: Number,
  Square_footage: String,
  Description: String,
  Mortgage: Number,
  New: Boolean,
  Price_change: Number,
});

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

/*  home characteristics - single family? condo? duplex? etc
price per sqft and days on market are calculable on back end before returning
data to front end
rooms...? dining room family room
type of cooling system - central
microwave?
fireplace?
parking type ie attached
attic
tv info - cable ready?
roof type (composition)
heating type - forced air
air conditioning?
dishwasher
garage?
security system?
lawn?
valted ceiling
lot size
room count
heating fuel?
refrigerator?
floor type : hardwood
ceiling fan
parking spaces
bbq area
exterior? brick vinyl
mls/source id
great views

laundry facilities
washer
dryer

elevator
garage
fireplace
garden

parking:
floors:
exterior:
stucco

contemporary architecture
garden

home types :
house
condo
townhome
multi-family
land
mobile/manufactured
other

all for sale:
resale
for sale by owner
new construction
foreclosures
new listings
open houses
price reduced
include pending listings

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

const similarListings = mongoose.model('SimilarListings', listingSchema);
const nearbyListings = mongoose.model('NearbyListings', listingSchema);

module.exports = { similarListings, nearbyListings };
