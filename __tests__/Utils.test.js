describe('유틸 함수 기능 테스트', () => {
  it('난수를 생성합니다. n 이상 ~ m 이하', () => {
    // given
    const randomFn = Utils.generateRandomNumber;
    const range = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    // when
    const randomValue1 = range.includes(randomFn(0, 9));
    const randomValue2 = range.includes(randomFn(0, 10));
    const randomValue3 = range.includes(randomFn(-1, 8));

    // then
    expect(randomValue1).toBeTruthy();
    expect(randomValue2).toBeFalsy();
    expect(randomValue3).toBeFalsy();
  });
});
