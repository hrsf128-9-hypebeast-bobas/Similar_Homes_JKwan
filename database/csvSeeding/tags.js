const { v4: uuidv4 } = require('uuid');
const CsvWriter = require('./CsvWriter');
const { dynamicTags, categorizedTags } = require('./lib/tags');
const { ListingTagGenerator, listingTagWriter } = require('./listingTags');
const { generateRandomIntBelow, selectRandomArrayElement } = require('./lib/random');

const fields = ['id', 'tag', 'category'];
const tagWriter = new CsvWriter('tags', fields, 'Tag seeding');

const listingTagGenerator = new ListingTagGenerator(listingTagWriter);

// value - compare price by sqft to nearby/ neighborhood
//

const TagGenerator = function TagGenerator(stream) {
  this.stream = stream;
  this.index = 0;
  this.dynamicTags = dynamicTags;
  this.categorizedTagIds = [];
  this.categories = {};
  this.initialize();
};

// will refactor laaattter soz for the wet code
TagGenerator.prototype.addDynamicTags = function addDynamicTags(category, value, listingId, final) {
  const {
    type, section, unit, tags,
  } = this.dynamicTags[category];

  if (type === 'range') {
    const highRangeStart = Math.floor(value - (value % section));
    const highRangeEnd = highRangeStart + section;
    const highTag = `${highRangeStart}-${highRangeEnd}${unit}`;

    this.writeDynamicListingTag(
      category, highTag, listingId, tags[highTag], value < section && final,
    );

    if (value >= section) {
      const lowRangeStart = highRangeStart - (section / 2);
      const lowRangeEnd = highRangeStart + (section / 2);
      const lowTag = `${lowRangeStart}-${lowRangeEnd}${unit}`;

      this.writeDynamicListingTag(category, lowTag, listingId, tags[lowTag], final);
    }
  } else if (type === 'count') {
    const countTag = `${value} ${unit}`;
    this.writeDynamicListingTag(category, countTag, listingId, tags[countTag], final);
  }
};

// check if this is duplicated elsewhere ..?
TagGenerator.prototype.randomlyTagListing = function randomlyTagListing(listingId, count, final) {
  const categoryCount = this.categorizedTagIds.length;
  const selectedCategories = {};
  for (let i = 0; i < count; i += 1) {
    let categoryIndex = generateRandomIntBelow(categoryCount);
    while (selectedCategories[categoryIndex]) {
      categoryIndex = generateRandomIntBelow(categoryCount);
    }
    const ids = this.categorizedTagIds[categoryIndex];
    const tagId = selectRandomArrayElement(ids);
    listingTagGenerator.add(listingId, tagId, final);
  }
};

TagGenerator.prototype.writeDynamicListingTag = function writeDynamicListingTag(
  category, tag, listingId, tagId, final,
) {
  if (!tagId) {
    this.stream.writeRowsWithDrain((processRow, shouldContinue) => {
      if (shouldContinue()) {
        // eslint-disable-next-line no-param-reassign
        tagId = uuidv4();
        const row = this.generateTag(tagId, tag, category);
        this.dynamicTags[category][tag] = true;
        processRow(row, final);
        listingTagGenerator.add(tagId, listingId, final);
      }
    });
  } else {
    listingTagGenerator.add(tagId, listingId, final);
    if (final) {
      this.stream.end();
    }
  }
};

TagGenerator.prototype.generateInitialRows = function generateInitialRows(categoryIterator) {
  let { value, done } = categoryIterator.next();
  while (!done) {
    const [category, tags] = value;
    if (!this.categories[category]) {
      this.categories[category] = this.categorizedTagIds.length;
      this.categorizedTagIds.push([]);
    }
    const ids = this.categorizedTagIds[this.categories[category]];
    this.stream.writeRowsWithDrain((processRow, shouldContinue) => {
      this.initializeTags(category, tags, ids, processRow, shouldContinue);
    });
    ({ value, done } = categoryIterator.next());
  }
};

TagGenerator.prototype.initializeTags = function initializeTags(
  category, tags, ids, processRow, shouldContinue,
) {
  if (shouldContinue()) {
    const tagIterator = tags[Symbol.iterator]();
    let { value: tag, done } = tagIterator.next();
    while (!done && shouldContinue()) {
      this.index += 1;
      const uuid = uuidv4();
      ids.push(uuid);
      const row = this.generateTag(uuid, tag, category);
      processRow(row);
      ({ value: tag, done } = tagIterator.next());
    }
  }
};

TagGenerator.prototype.generateTag = function generateTag(uuid, tag, category) {
  const row = [uuid, tag, category];
  return row;
};

TagGenerator.prototype.initialize = function initialize() {
  const categoryIterator = categorizedTags[Symbol.iterator]();
  this.generateInitialRows(categoryIterator);
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

module.exports = { tagWriter, TagGenerator };
