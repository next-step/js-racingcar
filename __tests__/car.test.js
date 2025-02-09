import Car, { makeCar } from "../src/domain/car";

describe("차 인스턴스를 만들때", () => {
  let car;

  beforeAll(() => {
    car = new Car("붕붕");
  });

  test("자동차는 전달 받은 값을 이름으로 가진다.", () => {
    expect(car.name).toBe("붕붕");
  });

  test("자동차는 위치 값을 가지며, 초기 상태는 0이다.", () => {
    expect(car.state).toBe(0);
  });

  test("자동차의 내장 메서드인 go를 한번 실행하면 1만큼 전진한다.", () => {
    //메서드 실행하기전 초기값 설정
    const initialState = car.state;
    //메서드 실행
    car.go();
    //메서드 실행후 state 값 저장
    const afterState = car.state;

    expect(afterState - initialState).toBe(1);
  });
});
