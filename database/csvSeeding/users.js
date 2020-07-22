const { v4: uuidv4 } = require('uuid');
const { generateName } = require('./lib/names');
const { distributedRandomInt } = require('./lib/random');
const CsvWriter = require('./lib/CsvWriter');
const setupPrototypalMethodInheritance = require('./lib/inheritance');

// \\\\\\\\\\\\\ //
//   generator   //
// \\\\\\\\\\\\\ //

const UserWriter = function UserWriter(filepath) {
  const fields = ['id', 'annualIncome', 'name'];
  CsvWriter.call(this, filepath, fields, 'User seeding');
  this.index = 0;
};

setupPrototypalMethodInheritance(UserWriter, CsvWriter);

UserWriter.prototype.generateUsers = function generateUsers(count, processRow, continueCondition) {
  while (continueCondition() && this.index < count) {
    const income = distributedRandomInt(40000, 1000000, 1.1);
    const name = generateName();
    const uuid = uuidv4();
    const row = [uuid, income, name];
    processRow(row);
    this.index += 1;
  }
  if (this.index >= count) {
    this.index = 0;
  }
};

UserWriter.prototype.execute = function execute() {
  this.processAndDrain((rowProcessor, continueCondition) => {
    this.generateUsers(rowProcessor, continueCondition);
  });
};

module.exports = UserWriter;
