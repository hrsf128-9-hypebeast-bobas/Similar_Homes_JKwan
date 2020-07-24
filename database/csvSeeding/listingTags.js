const CsvWriter = require('./CsvWriter');

const fields = ['tagId', 'listingId'];
const listingTagWriter = new CsvWriter('listingTags', fields, 'Listing Tags seeding');

// \\\\\\\\\\\\\ //
//   generator   //
// \\\\\\\\\\\\\ //

const ListingTagGenerator = function ListingTagsGenerator(stream) {
  this.stream = stream;
  this.index = 0;
};

ListingTagGenerator.prototype.generateListingTag = function generateListingTag(
  tagId, listingId, processRow, shouldContinue, final,
) {
  if (shouldContinue()) {
    const row = [tagId, listingId];
    this.index += 1;
    processRow(row, final);
  }
};

ListingTagGenerator.prototype.add = function add(tagId, listingId, final) {
  this.stream.writeRowsWithDrain((rowProcessor, shouldContinue) => {
    this.generateListingTag(tagId, listingId, rowProcessor, shouldContinue, final);
  });
};

module.exports = { listingTagWriter, ListingTagGenerator };
