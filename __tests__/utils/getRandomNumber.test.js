import { getRandomNumberFromZeroToNine } from '../../src/utils/getRandomNumber';

describe('getRandomNumberFromZeroToNine 테스트', () => {
  test('0 ~ 9 사이의 랜덤 숫자를 반환 받는다.', () => {
    const randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.1);

    expect(getRandomNumberFromZeroToNine()).toBe(1);

    randomSpy.mockRestore();
  });
  test('0 ~ 9 사이의 랜덤 숫자를 반환 받는다.', () => {
    const randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.5);

    expect(getRandomNumberFromZeroToNine()).toBe(5);

    randomSpy.mockRestore();
  });
  test('0 ~ 9 사이의 랜덤 숫자를 반환 받는다.', () => {
    const randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.9);

    expect(getRandomNumberFromZeroToNine()).toBe(9);

    randomSpy.mockRestore();
  });
});
