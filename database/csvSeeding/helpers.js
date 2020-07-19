const selectRandomArrayElement = (array) => {
  return array[generateRandomBelow(array.length)];
}

const generateRandomBetween = (lower, upper) => {
  const range = upper - lower;
  return Math.floor(Math.random() * range) + lower;
}

const generateRandomBelow = (limit) => {
  return Math.floor(Math.random() * limit);
}

module.exports.selectRandomArrayElement = selectRandomArrayElement;
module.exports.generateRandomBetween = generateRandomBetween;
module.exports.generateRandomBelow = generateRandomBelow;

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
  //   const index = generateRandomBelow(partCount);
  //   if (!used[index]) {
  //     const part = allparts[index];
  //     used[part] = true;
  //     word += part;
  //     syllableCount -= 1;
  //   }
  // }
  let word = [];
  const used = {};
  const groupCount = stringComponentGroups.length;
  const syllables = groupCount;
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

module.exports.mergeGroupsAndSelect = mergeGroupsAndSelect;

const shuffle = (arr) => {
  let unshuffledLength = arr.length;
  while (unshuffledLength) {
    const switchIndex = Math.floor(Math.random() * unshuffledLength);
    unshuffledLength -= 1;
    [arr[unshuffledLength], arr[switchIndex]] = [arr[switchIndex], arr[unshuffledLength]];
  }
  return arr;
}

module.exports.shuffle = shuffle;

const selectInShuffledOrder = (seperator, stringComponentGroups) => {
  let word = [];
  // keeping in mind we are trying to reduce space complexity (memory drain) lol
  let index = 0;
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
}

module.exports.selectInShuffledOrder = selectInShuffledOrder;

const selectInOrder = (seperator, stringComponentGroups) => {
  let word = [];
  for (let i = 0, { length } = stringComponentGroups; i < length; i += 1) {
    const part = selectRandomArrayElement(stringComponentGroups[i]);
    word.push(part);
  }
  return word.join(seperator);
}

module.exports.selectInOrder = selectInOrder;

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
    case 'default':
      word = selectInOrder(seperator, stringComponentGroups);
    break;
  }
  const capitalized = word[0].toUpperCase() + word.slice(1);
  return capitalized;
}

module.exports.generateCompoundString = generateCompoundString;

const generateName = () => {
  const phonemesA = ['ro', 'ena', 'pro', 'hay', 'di', 'co', 'la', 'e', 'jo' ];
  const phonemesB = ['fer', 'led', 'ttom', 'li', 'ric', 'nath'];
  const phonemesC = ['we', 'iln', 'o', 'a', 'ia', 'et', 'za', 'an'];

  return generateCompoundString('each', undefined, phonemesA, phonemesB, phonemesC);
}

module.exports.generateName = generateName;

// reference used : https://porch.com/resource/neighborhood-names
module.exports.generateNeighborhoodName = () => {
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
}

// would it be faster to pregen some bitwise 'randomizers' and then
// randomly select one from list and follow that pattern thereafter?

module.exports.generateCityName = () => {

  const firsts = ['Mate', 'San', 'Los', 'Mount', 'Angel', 'Bear', 'Spark', generateName(), generateName()];
  const seconds = ['City', 'Ranch', 'Peak'];
  const suffixes = ['mouth', 'fort', 'port', 'borough', 'view', 'haven', 'ville', 'town', 'ship'];
  // functionally a random bool
  const useSingleWord = Math.round(Math.random());
  const name = generateCompoundString('ordered', useSingleWord ? '' : ' ', firsts, useSingleWord ? suffixes : seconds);
  return name;
}

module.exports.generateStreetNames = (count) => {
  const roadNames = ['1st', '2nd', 'Arrow', 'Broad', 'Laithe'];
  const roadTypes = ['Road', 'Boulevard', 'Street', 'Place', 'Alley', 'Way'];

  const names = [];

  while (count) {
    const name = generateCompoundString('ordered', ' ', roadNames, roadTypes);
    names.push(name);
    count -= 1;
  }
  return names;
}

// check for local duplicate ...?
module.exports.generateStreetNumber = () => {
  return generateRandomBelow(9999);
}

module.exports.generateRegionalUsers = () => {
  // can just generate random numer; add that to current userId; associate any id in that range to this col
  // of listing ie til y back to zero (hit overflow --> overflowing? overflowed?);
}

module.exports.generateRandomY = () => {
  // what params should this take?
}

// convert x,y matrix coord to lat/long
module.exports.convertCoords = (x, y, offsetX = 25.118, offsetY = -124.73) => {
  return [ x / 1000 + offsetX, y / 1000 + offsetY ];
}

module.exports.associateTags = () => {

}
