const CsvWriter = require('./lib/CsvWriter');
const setupPrototypalMethodInheritance = require('./lib/inheritance');

// \\\\\\\\\\\\\ //
//   generator   //
// \\\\\\\\\\\\\ //

const ListingTagsWriter = function ListingTagsWriter(filepath) {
  const fields = ['tagId', 'listingId'];
  CsvWriter.call(this, filepath, fields, 'Listing Tags seeding');
  this.index = 0;
};

setupPrototypalMethodInheritance(ListingTagsWriter, CsvWriter);

ListingTagsWriter.prototype.generateUsers = function generateUsers(
  count, processRow, continueCondition,
) {
  while (continueCondition() && this.index < count) {
    const row = [tagId, listingId];
    processRow(row);
    this.index += 1;
  }
  if (this.index >= count) {
    this.index = 0;
  }
};

ListingTagsWriter.prototype.execute = function execute() {
  this.processAndDrain((rowProcessor, continueCondition) => {
    this.generateListingTags(rowProcessor, continueCondition);
  });
};

module.exports = ListingTagsWriter;
