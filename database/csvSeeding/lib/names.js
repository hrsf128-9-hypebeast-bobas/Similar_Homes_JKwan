const {
  // generateRandomIntBelow,
  // generateRandomIntBetween,
  selectRandomArrayElement,
  shuffle, generateRandomBoolean,
  generateWeightedRandomBoolean,
  randomIntWithOrdinal,
} = require('./random');

// would be more efficient to randomize group with repetition
// can refactor lady; easy to extract common functionality
// from selectInShuffledOrder (selectUnorderedWithRepetition)
const mergeGroupsAndSelect = (seperator, stringComponentGroups) => {
  // const selectedIndexes = {};
  // const syllableCount = stringComponentGroups.length;
  // let allparts = Array.prototype.concat.apply([], stringComponentGroups);
  // const partCount = allparts.length;
  // while (syllableCount) {
  //   // const index = selectRandomArrayElement(allparts);
  //   const index = generateRandomIntBelow(partCount);
  //   if (!used[index]) {
  //     const part = allparts[index];
  //     used[part] = true;
  //     word += part;
  //     syllableCount -= 1;
  //   }
  // }
  const word = [];
  const used = {};
  const groupCount = stringComponentGroups.length;
  let syllables = groupCount;
  while (syllables) {
    const group = selectRandomArrayElement(stringComponentGroups);
    const part = selectRandomArrayElement(group);
    if (!used[part]) {
      used[part] = true;
      word.push(part);
      syllables -= 1;
    }
  }
  return word.join(seperator);
};

const selectInShuffledOrder = (seperator, stringComponentGroups) => {
  const word = [];
  // keeping in mind we are trying to reduce space complexity (memory drain) lol
  let index = 0;
  // allows shuffle to not mutate input array
  const order = [];
  while (index < stringComponentGroups.length) {
    order.push(index);
    index += 1;
  }
  shuffle(order);
  while (index) {
    index -= 1;
    const current = order[index];
    const group = stringComponentGroups[current];
    const part = selectRandomArrayElement(group);
    word.push(part);
  }
  return word.join(seperator);
};

const selectInOrder = (seperator, stringComponentGroups) => {
  const word = [];
  for (let i = 0, { length } = stringComponentGroups; i < length; i += 1) {
    const part = selectRandomArrayElement(stringComponentGroups[i]);
    word.push(part);
  }
  return word.join(seperator);
};

// could expand to specify syllable count

// option can be any (each syllables can come from any group), each (one syllable from each group),
// ordered (one syllable from each in input order)
const generateCompoundString = (option, seperator = '', ...stringComponentGroups) => {
  let word = '';
  switch (option) {
    case 'any':
      word = mergeGroupsAndSelect(seperator, stringComponentGroups);
      break;
    case 'each':
      word = selectInShuffledOrder(seperator, stringComponentGroups);
      break;
    case 'ordered':
    default:
      word = selectInOrder(seperator, stringComponentGroups);
  }
  const capitalized = word[0].toUpperCase() + word.slice(1);
  return capitalized;
};

const generateName = () => {
  const phonemesA = ['ro', 'ena', 'pro', 'hay', 'di', 'co', 'la', 'e', 'jo'];
  const phonemesB = ['fer', 'led', 'ttom', 'li', 'ric', 'nath', 'mi'];
  const phonemesC = ['we', 'iln', 'o', 'a', 'ia', 'et', 'za', 'an', 'ly'];

  return generateCompoundString('each', undefined, phonemesA, phonemesB, phonemesC);
};

// reference used : https://porch.com/resource/neighborhood-names
const generateNeighborhoodName = () => {
  // use generateName, either on it's own or as first part, based on rand ?
  const first = [
    'Baker', 'Bubble', 'Codery', 'Pacific', 'Best', 'Worst', 'Santa', 'Valley',
    'Lake', 'River', 'Park', 'Down', 'Old', 'New', 'Sky', 'East', 'West', 'North', 'South', 'Alta', 'Oak', 'Little', 'Red', 'Rock', 'Mortal', 'Obsequies',
  ];

  const second = [
    'Hill', 'Heights', 'View', 'Sunrise', 'Ridge', 'Town', 'Side', 'Vista',
    'Basin', 'Reaches', 'Pit', 'Sands', 'Star', 'Stream', 'Village', 'Forest', 'Green',
    'Mills', 'Gardens', 'Cove', 'Rock', 'Junction',
  ];

  const name = generateCompoundString('each', ' ', first, second);
  return name;
};

// would it be faster to pregen some bitwise 'randomizers' and then
// randomly select one from list and follow that pattern thereafter?

const generateCityName = () => {
  const firsts = ['Mate', 'San', 'Los', 'Mount', 'Angel', 'Bear', 'Spark', generateName(), generateName()];
  const seconds = ['City', 'Ranch', 'Peak'];
  const suffixes = ['mouth', 'fort', 'port', 'borough', 'view', 'haven', 'ville', 'town', 'ship'];
  // functionally a random bool
  const useSingleWord = generateRandomBoolean();
  const name = generateCompoundString('ordered', useSingleWord ? '' : ' ', firsts, useSingleWord ? suffixes : seconds);
  return name;
};

const generateStreetName = () => {
  const roadNames = ['Arrow', 'Broad', 'Laithe'];
  const roadTypes = ['Road', 'Boulevard', 'Street', 'Place', 'Alley', 'Way', 'Row'];
  const suffixes = ['N', 'S', 'E', 'W'];

  const useSuffix = generateWeightedRandomBoolean(4);
  const useNumberedStreet = generateWeightedRandomBoolean(0.3);
  const names = useNumberedStreet ? [randomIntWithOrdinal(1, 100)] : roadNames;

  const compoundStringArgs = ['ordered', ' ', names, roadTypes];

  if (useSuffix) {
    compoundStringArgs.push(suffixes);
  }

  const name = generateCompoundString(...compoundStringArgs);

  return name;
};

const generateRegionalUsers = () => {
  // can just generate random numer
  // add that to current userId;
  // associate any id in that range to this col
  // of listing ie til y back to zero (hit overflow --> overflowing? overflowed?);
};

const generateRandomCoord = () => {
  // what params should this take?
};

// convert x,y matrix coord to lat/long
const convertCoords = (x, y, offsetX = 25.118, offsetY = -124.73) => (
  [x / 1000 + offsetX, y / 1000 + offsetY]
);

const associateTags = () => {

};

module.exports = {
  selectInOrder,
  mergeGroupsAndSelect,
  selectInShuffledOrder,
  generateCompoundString,
  generateName,
  generateNeighborhoodName,
  generateCityName,
  generateStreetName,
  generateRegionalUsers,
  generateRandomCoord,
  convertCoords,
  associateTags,
};
