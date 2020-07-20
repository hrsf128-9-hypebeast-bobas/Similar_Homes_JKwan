// approximates random dist w/ skew

// skew > 1 will be positively skewed,
// 0 < skew < 1 will be positively skewed
const distributedRandomInt = (min = 0, max = 1, skew = 1) => {
  let rand = 0;
  const sampleSize = 4;
  for (let i = 0; i < sampleSize; i += 1) {
    rand += Math.random();
  }
  rand /= sampleSize;
  rand **= skew;
  rand *= max - min;
  rand = Math.trunc(rand);
  rand += min;
  return rand;
};

const shuffle = (arr) => {
  const shuffled = [...arr];
  let unshuffledLength = arr.length;
  while (unshuffledLength) {
    const switchIndex = Math.floor(Math.random() * unshuffledLength);
    unshuffledLength -= 1;
    [
      shuffled[unshuffledLength], shuffled[switchIndex],
    ] = [
      shuffled[switchIndex], shuffled[unshuffledLength],
    ];
  }
  return shuffled;
};

const generateRandomBoolean = () => !!Math.round(Math.random);

const generateWeightedRandomBoolean = (weight = 1) => {
  if (weight < 0) {
    return new Error('Weight must be positive. To skew towards true, choose a number between 0 and 1. To skew towards false, choose a number above 1.');
  }
  let bool = distributedRandomInt(0, 2, weight);
  bool = !!bool;
  return bool;
};

const generateRandomIntBelow = (limit) => Math.floor(Math.random() * limit);

const generateRandomIntBetween = (lower, upper) => {
  const range = upper - lower;
  return Math.floor(Math.random() * range) + lower;
};

const selectRandomArrayElement = (array) => array[generateRandomIntBelow(array.length)];

const randomIntWithOrdinal = (min = 1, max = 100) => {
  const int = generateRandomIntBetween(min, max);
  const tens = int % 100;
  const ones = tens % 10;
  let suffix = 'th';
  if (ones < 4) {
    if (ones === 1 && tens !== 11) {
      suffix = 'st';
    } else if (ones === 2 && tens !== 12) {
      suffix = 'nd';
    } else if (ones === 3 && tens !== 13) {
      suffix = 'rd';
    }
  }
  const intWithOrdinal = int + suffix;
  return intWithOrdinal;
};

module.exports = {
  distributedRandomInt,
  shuffle,
  generateRandomBoolean,
  generateWeightedRandomBoolean,
  generateRandomIntBelow,
  generateRandomIntBetween,
  selectRandomArrayElement,
  randomIntWithOrdinal,
};
