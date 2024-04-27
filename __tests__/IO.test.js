describe('입출력 관련된 것들', () => {
  test('자동차 이름은 쉼표(,)를 기준으로 구분하여 입력받는다.', () => {
    //Given
    const cario = new CarIO();

    //when
    cario.readLineAsync = jest.fn().mockReturnValue('bmw,audi,kia');
    cario.inputCars();

    //then
    expect(cario.getCar()).toBe('bmw,audi,kia');
  });
});
