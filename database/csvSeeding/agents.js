const { v4: uuidv4 } = require('uuid');
const { generateName } = require('./lib/names');
const CsvWriter = require('./CsvWriter');

const fields = ['id', 'name'];
const agentWriter = new CsvWriter('agents', fields, 'Agent seeding');

// \\\\\\\\\\\\\ //
//   generator   //
// \\\\\\\\\\\\\ //

const AgentConstructor = function AgentConstructor(stream) {
  this.stream = stream;
  this.index = 0;
};

AgentConstructor.prototype.generateAgents = function generateAgents(
  count, processRow, shouldContinue,
) {
  while (shouldContinue() && this.index < count) {
    // better name generation
    const name = generateName();
    const uuid = uuidv4();
    const row = [uuid, name];
    processRow(row);
    this.index += 1;
  }
};

AgentConstructor.prototype.execute = function execute() {
  this.stream.writeAndDrain((rowProcessor, shouldContinue) => {
    this.generateAgents(rowProcessor, shouldContinue);
  });
};

module.exports = { agentWriter, AgentConstructor };
