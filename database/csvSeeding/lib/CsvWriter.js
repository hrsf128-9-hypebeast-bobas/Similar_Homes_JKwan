/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

// \\\\\\\\\\\\\\\\\\ //
//   csv writestream  //
// \\\\\\\\\\\\\\\\\\ //

const CsvWriter = function CsvWriter(filepath, fields, timerMessage) {
  this.paused = false;
  this.filepath = path.join(__dirname, filepath);
  this.timerMessage = timerMessage;
  this.maxRows = 100000;
  this.rowCount = 0;
  this.filesProduced = 0;
  // append to file instead of overwriting (usef)
  this.stream = this.newStream();
  this.fields = fields;
};

CsvWriter.prototype.currentFilepath = function currentFilepath() {
  return this.filepath + this.filesProduced;
};

CsvWriter.prototype.newStream = function newStream() {
  if (this.timerMessage) {
    console.time(this.timerMessage + this.filesProduced);
  }
  const stream = fs.createWriteStream(this.currentFilepath(), 'utf8', { flags: 'a' })
    .on('error', () => {
      console.log(`Csv write error with ${this.timerMessage + this.filesProduced || this.filepath}`);
    })
    .on('finish', () => {
      if (this.timerMessage) {
        console.timeEnd(this.timerMessage + this.filesProduced);
      }
    });
  // write header
  stream.write(this.fields);
  return stream;
};

CsvWriter.prototype.toCsvRow = function toCsvRow(array) {
  return `${array.join(',')}\n`;
};

CsvWriter.prototype.writeRow = function writeRow(row) {
  if (this.rowCount > this.rowLimit) {
    this.stream.end();
    this.rowCount = 0;
    this.paused = false;
    this.filesProduced += 1;
    this.stream = this.newStream();
  }
  const isWritable = this.stream.write(this.toCsvRow(row));
  this.paused = !isWritable;
  this.rowCount += 1;
};

CsvWriter.prototype.end = function end() {
  this.stream.end();
};

CsvWriter.prototype.writeRowsWithDrain = function writeRowsWithDrain(rowGenerator) {
  const continueCondition = function continueCondition() { return !this.paused; };

  rowGenerator(this.writeRow, continueCondition);
  if (this.paused) {
    this.stream.once('drain', () => {
      this.paused = false;
      this.writeRowsWithDrain(rowGenerator);
    });
  }
};

module.exports = CsvWriter;
