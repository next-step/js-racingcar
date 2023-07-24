const { isInvalid } = require('../src/index');
describe('Valid', () => {
  test('Valid case1', () => {
    expect(isInvalid('pobi,crong,honux')).toBe(false);
  });

  test('Invalid case2', () => {
    expect(isInvalid('pobi, crong,honux,verylongname')).toBe(true);
  });
});
