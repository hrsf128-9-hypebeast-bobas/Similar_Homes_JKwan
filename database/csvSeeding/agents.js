const { v4: uuidv4 } = require('uuid');
const { generateName } = require('./lib/names');
const CsvWriter = require('./lib/CsvWriter');
const setupPrototypalMethodInheritance = require('./lib/inheritance');

// \\\\\\\\\\\\\ //
//   generator   //
// \\\\\\\\\\\\\ //

const AgentWriter = function AgentWriter(filepath) {
  const fields = ['id', 'name'];
  CsvWriter.call(this, filepath, fields, 'Agent seeding');
  this.index = 0;
};

setupPrototypalMethodInheritance(AgentWriter, CsvWriter);

AgentWriter.prototype.generateAgents = function generateAgents(
  count, processRow, continueCondition,
) {
  while (continueCondition() && this.index < count) {
    // better name generation
    const name = generateName();
    const uuid = uuidv4();
    const row = [uuid, name];
    processRow(row);
    this.index += 1;
  }
  if (this.index >= count) {
    this.index = 0;
  }
};

AgentWriter.prototype.execute = function execute() {
  this.processAndDrain((rowProcessor, continueCondition) => {
    this.generateAgents(rowProcessor, continueCondition);
  });
};

module.exports = AgentWriter;
