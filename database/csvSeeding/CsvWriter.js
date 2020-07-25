/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const Queue = require('./lib/Queue.src.js');

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
  this.queue = new Queue();
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
    .on('drain', () => {
      this.paused = false;
      while (!this.paused && !this.queue.isEmpty()) {
        const isWritable = this.stream.write(this.queue.dequeue());
        this.paused = !isWritable;
        this.rowCount += 1;
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
  this.queue.enqueue(this.toCsvRow(row));
  while (!this.paused && !this.queue.isEmpty()) {
    const isWritable = this.stream.write(this.queue.dequeue());
    this.paused = !isWritable;
    this.rowCount += 1;
  }
  if (final) {
    if (!this.queue.isEmpty()) {
      this.stream.on('drain', () => {
        if (this.queue.isEmpty()) {
          this.stream.end();
        }
      });
    } else {
      this.stream.end();
    }
  }
};

CsvWriter.prototype.end = function end() {
  this.stream.end();
};

CsvWriter.prototype.writeRowsWithDrain = function writeRowsWithDrain(rowGenerator) {
  // const shouldContinue = () => !this.paused;
  const shouldContinue = () => true;
  const queueSize = this.queue.getLength();
  const timeout = queueSize < 2500 ? 0 : Math.floor(Math.sqrt(this.queue.getLength()));
  setTimeout(() => {
    rowGenerator((row, final) => {
      this.writeRow(row, final);
    }, shouldContinue);
  }, timeout);
  // if (this.paused) {
  //   this.stream.once('drain', () => {
  //     this.paused = false;
  //     this.writeRowsWithDrain(rowGenerator);
  //   });
  // }
};

module.exports = CsvWriter;
