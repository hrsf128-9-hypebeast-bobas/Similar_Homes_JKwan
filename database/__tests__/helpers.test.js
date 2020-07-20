const {
  generateName, generateNeighborhoodName,
  generateCityName, generateStreetNames,
} = require('../csvSeeding/helpers');

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
    // console.log(names);
    expect(typeof name).toBe('string');
  });
});

describe('generate neighborhood name', () => {
  test('returns a string', () => {
    const names = [];
    for (let i = 0; i < 20; i += 1) {
      names.push(generateNeighborhoodName());
    }
    const name = names[0];
    // console.log('Neighborhood names', names);
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
    // console.log('City names', names);
    expect(typeof name).toBe('string');
  });
});

describe('generate street names', () => {
  test('returns a string', () => {
    const names = generateStreetNames(20);
    const name = names[0];
    // console.log('Street names', names);
    expect(typeof name).toBe('string');
  });
});
