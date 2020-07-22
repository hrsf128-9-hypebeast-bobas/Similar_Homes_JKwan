const CsvWriter = require('./lib/CsvWriter');
const setupPrototypalMethodInheritance = require('./lib/inheritance');

// \\\\\\\\\\\\\ //
//   generator   //
// \\\\\\\\\\\\\ //

const LikedListingsWriter = function LikedListingsWriter(filepath) {
  const fields = ['userId', 'listingId'];
  CsvWriter.call(this, filepath, fields, 'Liked Listings seeding');
  this.index = 0;
};

setupPrototypalMethodInheritance(LikedListingsWriter, CsvWriter);

LikedListingsWriter.prototype.generateUsers = function generateUsers(
  count, processRow, continueCondition,
) {
  while (continueCondition() && this.index < count) {
    const row = [userId, listingId];
    processRow(row);
    this.index += 1;
  }
  if (this.index >= count) {
    this.index = 0;
  }
};

LikedListingsWriter.prototype.execute = function execute() {
  this.processAndDrain((rowProcessor, continueCondition) => {
    this.generateLikedListings(rowProcessor, continueCondition);
  });
};

module.exports = LikedListingsWriter;
