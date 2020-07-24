const CsvWriter = require('./CsvWriter');

const fields = ['userId', 'listingId'];
const likedListingWriter = new CsvWriter('likedListings', fields, 'Liked Listings seeding');

// \\\\\\\\\\\\\ //
//   generator   //
// \\\\\\\\\\\\\ //

const LikedListingGenerator = function LikedListingsGenerator(stream) {
  this.stream = stream;
  this.index = 0;
};

LikedListingGenerator.prototype.generateLikedListing = function LikedListing(
  userId, listingId, processRow, shouldContinue, final,
) {
  if (shouldContinue()) {
    const row = [userId, listingId];
    processRow(row, final);
    this.index += 1;
  }
};

LikedListingGenerator.prototype.add = function add(userId, listingId, final) {
  this.stream.writeRowsWithDrain((rowProcessor, shouldContinue) => {
    this.generateLikedListing(userId, listingId, rowProcessor, shouldContinue, final);
  });
};

module.exports = { LikedListingGenerator, likedListingWriter };
