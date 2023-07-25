import { getRandomNumberFromZeroToNine } from '../../src/utils/getRandomNumber';

describe('0 ~ 9 사이의 랜덤 숫자를 반환 받는 getRandomNumberFromZeroToNine 테스트', () => {
  test('1을 반환 받을 때', () => {
    const randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.1);

    expect(getRandomNumberFromZeroToNine()).toBe(1);

    randomSpy.mockRestore();
  });
  test('5를 반환 받을 때', () => {
    const randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.5);

    expect(getRandomNumberFromZeroToNine()).toBe(5);

    randomSpy.mockRestore();
  });
  test('9를 반환 받을 때', () => {
    const randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.9);

    expect(getRandomNumberFromZeroToNine()).toBe(9);

    randomSpy.mockRestore();
  });
});
