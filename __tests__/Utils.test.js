import Utils from '../src/utils/inedx';

describe('유틸 함수 기능 테스트', () => {
  it('0~9사이의 난수를 생성합니다.', () => {
    // given
    const randomFn = Utils.generateRandomNumber;

    // when
    const randomNumber = randomFn(0, 9);
    const range = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    // then
    expect(randomNumber).toEqual(expect.any(Number));
    expect(randomNumber).toBeGreaterThanOrEqual(0);
    expect(randomNumber).toBeLessThanOrEqual(9);
    expect(range).toContain(randomNumber);
  });
});
