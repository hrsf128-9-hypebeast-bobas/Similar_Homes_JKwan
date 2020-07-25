const { shuffle, distributedRandomInt } = require('../csvSeeding/lib/random');

describe('shuffle', () => {
  test('shuffles array', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7];
    const shuffled = shuffle([...arr]);
    expect(shuffled).not.toEqual(arr);
    expect(shuffled.length).toBe(arr.length);
  });
});

// can test by actually running a bunch of times I guess? and checking.... mean...?
describe('distributed skewed randoms', () => {
  test('returns number in range', () => {
    const min = 0;
    const max = 5;
    const rand = distributedRandomInt(0, 5);
    expect(rand).toBeLessThan(max);
    expect(rand).toBeGreaterThan(min);
  });
});
