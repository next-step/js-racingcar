import { getRandomNumberFromZeroToNine } from '../../src/utils/getRandomNumber';

describe('getRandomNumberFromZeroToNine 테스트', () => {
  test('0 ~ 9 사이의 랜덤 숫자를 반환 받는다.', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.1);

    expect(getRandomNumberFromZeroToNine()).toBe(1);

    jest.spyOn(global.Math, 'random').mockRestore();
  });
  test('0 ~ 9 사이의 랜덤 숫자를 반환 받는다.', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.5);

    expect(getRandomNumberFromZeroToNine()).toBe(5);

    jest.spyOn(global.Math, 'random').mockRestore();
  });
  test('0 ~ 9 사이의 랜덤 숫자를 반환 받는다.', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.9);

    expect(getRandomNumberFromZeroToNine()).toBe(9);

    jest.spyOn(global.Math, 'random').mockRestore();
  });
});
