const { generateName, generateNeighborhoodName, generateCityName, generateStreetNames, shuffle } = require('../csvSeeding/helpers');

describe('select random below', () => {
  test('', () => {
    expect(true).toBe(true);
  });
});

describe('generate name function', () => {
  test('returns a string', () => {
    const names = [];
    for (let i = 0; i < 20; i += 1) {
      names.push(generateName());
    }
    const name = names[0];
    console.log(names);
    expect(typeof name).toBe('string');
  });
});

describe('shuffle', () => {
  test('shuffles array', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7];
    const shuffled = shuffle([...arr]);
    expect(shuffled).not.toEqual(arr);
    expect(shuffled.length).toBe(arr.length);
  });
});

describe('shuffle', () => {
  test('shuffles array', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7];
    const shuffled = shuffle([...arr]);
    expect(shuffled).not.toEqual(arr);
    expect(shuffled.length).toBe(arr.length);
  });
});

describe('generate neighborhood name', () => {
  test('returns a string', () => {
    const names = [];
    for (let i = 0; i < 20; i += 1) {
      names.push(generateNeighborhoodName());
    }
    const name = names[0];
    console.log('Neighborhood names', names);
    expect(typeof name).toBe('string');
  });
});

describe('generate city name', () => {
  test('returns a string', () => {
    const names = [];
    for (let i = 0; i < 20; i += 1) {
      names.push(generateCityName());
    }
    const name = names[0];
    console.log('City names', names);
    expect(typeof name).toBe('string');
  });
});

describe('generate street names', () => {
  test('returns a string', () => {
    const names = generateStreetNames(20);
    const name = names[0];
    console.log('Street names', names);
    expect(typeof name).toBe('string');
  });
});