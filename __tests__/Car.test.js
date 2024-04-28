import Car from "../src/domain/Car.js";

/*
자동차
  - [ ] 자동차의 이름은 5자 이하로 가진다.
  - [ ] 자동차가 전진 또는 멈출 수 있다.
  - [ ] 0~9까지의 무작위 값을 구한 뒤 4 이상일 경우 전진한다.
*/

describe("자동차 기능 테스트", () => {
  test("자동차의 이름은 5자 이하로 가진다", () => {
    // given
    const car = new Car("crong");

    // when
    const name = car.name;

    // then
    expect(name.length).toBe(5);
  });

  // test("자동차의 이름이 5 이상이면 오류가 발생한다.", () => {
  //   // given
  //   const Cat = new Car("abcdefg");

  //   // TODO 구현
  // });

  // test("0~9까지의 무작위 값을 구한 뒤 4 이상일 경우 전진할 수 있다.", () => {
  //   // given
  //   const car = new Car("crong");

  //   // when
  //   car.move();

  //   // then
  //   expect(car.position).toBe(1);
  // });
});
