// ## 자동차에 이름을 부여할 수 있다. 전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.

import { Car } from "../src/Car";

const carName = "testCar";

describe("Car Class 기본적인 요소에 대해 테스트 한다.", () => {
  // - 자동차 클래스를 만든다. o
  // - 자동차 클래스의 생성자는 자동차이름을 인자로 받는다. o
  // - 자동차 자신이 얼마나 이동했는지에 대한 이동거리를 가진다. o
  // - 자동차는 이동에 대한 메서드를 가진다. o
  //   - 자동차 이동 메서드는 이동거리를 인자로 받는다. o
  //   - 자동차 이동 메서드는 호출 됐을 때 인자로 받은 이동거리만큼 이동거리를 업데이트 하고 자동차 이름을 출력한다. o
  let car;
  beforeEach(() => {
    // given
    car = new Car(carName);
  });

  test("이름 속성을 가진 Car 인스턴스가 생성된다.", () => {
    // when
    const carInstanceName = car.name;

    // then
    expect(carInstanceName).toBe(carName);
  });

  test("Car 인스턴스는 이동거리 / 우승 횟수 필드를 가지고 있다", () => {
    // when
    const carInstanceDistance = car.distance;
    const carInstanceWinCount = car.winCount;

    // then
    expect(carInstanceDistance).toBe(0);
    expect(carInstanceWinCount).toBe(0);
  });

  test("Car 인스턴스는 이동 메서드를 가지고 있고 호출 시에 인자로 받은 이동 거리만큼 움직인다", () => {
    // when
    car.move(10);

    // then
    expect(car.distance).toBe(1);
  });

  test("이동 메서드가 여러번 호출되면 이동거리가 누적되어 증가한다.", () => {
    // when
    car.move(10);
    car.move(10);

    // then
    expect(car.distance).toBe(2);
  });

  test("4미만의 거리가 입력되면 전진하지 않는다.", () => {
    // when
    car.move(3);

    // then
    expect(car.distance).toBe(0);
  });
});
