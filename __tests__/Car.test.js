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

  test ('자동자는 0~9까지의 무작위 값을 구한 뒤 4이상일 경우 전진한다', () => {
    // given
    const car = new Car('huru');

    // when
    car.move();

    // then
    if (car.move() >= 4) {
      expect(car.position).toBe(1);
    }
  })
})