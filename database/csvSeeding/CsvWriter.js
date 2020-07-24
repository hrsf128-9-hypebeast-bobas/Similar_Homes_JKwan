/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

// \\\\\\\\\\\\\\\\\\ //
//   csv writestream  //
// \\\\\\\\\\\\\\\\\\ //

const CsvWriter = function CsvWriter(filename, fields, timerMessage) {
  this.paused = false;
  this.filename = filename;
  this.timerMessage = timerMessage;
  this.maxRows = 10000000;
  this.rowCount = 0;
  this.filesProduced = 0;
  this.fields = fields;
  // append to file instead of overwriting (usef)
  this.stream = {};
  this.setNewStream();
};

CsvWriter.prototype.filepath = function filepath() {
  const file = path.join(__dirname, 'csv', `${this.filename + this.filesProduced}.csv`);
  return file;
};

CsvWriter.prototype.setNewStream = function setNewStream() {
  const message = `${this.timerMessage} ${this.filesProduced}`;
  if (this.timerMessage) {
    console.time(message);
  }
  this.stream = fs.createWriteStream(this.filepath(), 'utf8', { flags: 'a' })
    .on('error', (err) => {
      console.log(`Csv write error with ${message || this.filepath()}`);
      console.error(err);
    })
    .on('finish', () => {
      if (this.timerMessage) {
        console.timeEnd(message);
      }
    })
    .setMaxListeners(0);
  // write header
  this.stream.write(this.toCsvRow(this.fields));
};

CsvWriter.prototype.toCsvRow = function toCsvRow(array) {
  return `${array.join(',')}\n`;
};

CsvWriter.prototype.writeRow = function writeRow(row, final) {
  if (this.rowCount > this.rowLimit) {
    this.stream.end();
    this.rowCount = 0;
    this.paused = false;
    this.filesProduced += 1;
    this.setNewStream();
  }
  const isWritable = this.stream.write(this.toCsvRow(row));
  this.paused = !isWritable;
  this.rowCount += 1;
  if (final) {
    this.stream.end();
  }
};

CsvWriter.prototype.end = function end() {
  this.stream.end();
};

CsvWriter.prototype.writeRowsWithDrain = function writeRowsWithDrain(rowGenerator) {
  const shouldContinue = () => !this.paused;
  rowGenerator((row, final) => {
    this.writeRow(row, final);
  }, shouldContinue);
  if (this.paused) {
    this.stream.once('drain', () => {
      this.paused = false;
      this.writeRowsWithDrain(rowGenerator);
    });
  }
};

module.exports = CsvWriter;
