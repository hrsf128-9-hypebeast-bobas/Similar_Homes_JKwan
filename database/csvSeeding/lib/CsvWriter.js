/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

// \\\\\\\\\\\\\\\\\\ //
//   csv writestream  //
// \\\\\\\\\\\\\\\\\\ //

const CsvWriter = function CsvWriter(filepath, fields, timerMessage) {
  if (timerMessage) {
    console.time(timerMessage);
  }
  this.paused = false;
  this.filepath = path.join(__dirname, filepath);
  // append to file instead of overwriting (usef)
  this.stream = fs.createWriteStream(this.filepath, 'utf8', { flags: 'a' })
    .on('error', () => {
      console.log(`Csv write error with ${timerMessage || filepath}`);
    })
    .on('finish', () => {
      if (timerMessage) {
        console.timeEnd(timerMessage);
      }
    });
  this.writeHeader(fields);
};

CsvWriter.prototype.toCsvRow = function toCsvRow(array) {
  return `${array.join(',')}\n`;
};

CsvWriter.prototype.writeRow = function writeRow(row) {
  return this.stream.write(this.toCsvRow(row));
};

CsvWriter.prototype.writeHeader = function writeHeader(fields) {
  this.writeRow(fields);
};

CsvWriter.prototype.end = function writeHeader() {
  this.stream.end();
};

CsvWriter.prototype.processRowsWithDrain = function processRowsWithDrain(processor) {
  const rowProcessor = function rowProcessor(row) {
    const isWritable = this.writeRow(row);
    this.paused = !isWritable;
  };
  const continueCondition = function continueCondition() { return !this.paused; };

  processor(rowProcessor, continueCondition);
  if (this.paused) {
    this.stream.once('drain', () => {
      this.paused = false;
      this.processAndDrain(processor);
    });
  }
};

module.exports = CsvWriter;
