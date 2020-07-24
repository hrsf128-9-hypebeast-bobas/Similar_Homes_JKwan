const { v4: uuidv4 } = require('uuid');
const { generateName } = require('./lib/names');
const { distributedRandomInt, selectRandomArrayElement } = require('./lib/random');
const CsvWriter = require('./CsvWriter');
const { likedListingWriter, LikedListingGenerator } = require('./likedListings');

// \\\\\\\\\\\\\\\\\\\ //
//   initializations   //
// \\\\\\\\\\\\\\\\\\\ //

const likedListingGenerator = new LikedListingGenerator(likedListingWriter);
const fields = ['id', 'annualIncome', 'name'];
const userWriter = new CsvWriter('users', fields, 'User seeding');

// \\\\\\\\\\\\\ //
//   generator   //
// \\\\\\\\\\\\\ //

const UserGenerator = function UserGenerator(stream, count) {
  this.stream = stream;
  this.index = 0;
  this.count = count;
  this.ids = [];
};

// UserGenerator.generateUserIds = function generateUserIds(count) {
//   for (let i = 0; i < count; i += 1) {
//     this.ids.push(uuidv4());
//   }
// };

UserGenerator.prototype.generateRows = function generateRows(
  processRow = () => {}, shouldContinue = () => true, final,
) {
  while (shouldContinue() && this.index < this.count - 1) {
    const row = this.generateUser();
    this.index += 1;
    processRow(row);
  }
  if (shouldContinue() && this.index === this.count - 1) {
    const row = this.generateUser(final);
    this.index += 1;
    processRow(row, final);
  }
};

UserGenerator.prototype.generateUser = function generateUser() {
  const income = distributedRandomInt(40000, 1000000, 1.1);
  const name = generateName();
  // const uuid = this.ids[this.index];
  const uuid = uuidv4();
  this.ids.push(uuid);
  const row = [uuid, income, name];
  return row;
};

UserGenerator.prototype.getRandomUserId = function getRandomUserId() {
  return selectRandomArrayElement(this.ids);
};

UserGenerator.prototype.likeListing = function likeListing(listingId, count, final) {
  for (let i = 0; i < count - 1; i += 1) {
    const userId = this.getRandomUserId();
    likedListingGenerator.add(userId, listingId);
  }
  const userId = this.getRandomUserId();
  likedListingGenerator.add(userId, listingId, final);
};

UserGenerator.prototype.execute = function execute(final) {
  this.stream.writeRowsWithDrain((processRows, shouldContinue) => {
    this.generateRows(processRows, shouldContinue, final);
  });
};

module.exports = { userWriter, UserGenerator };
