import Car from "../src/Car";

describe('자동차 기능 테스트', () => {
  test('자동차의 이름은 5자 이하이다', () => {
    // given
    const car = new Car('huru');

    // when
    const name = car.name;

    // then
    expect(name.length).toBe(4);
  })

})