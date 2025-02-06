import Car from "../src/main";

// const car = new Car("붕붕");

let car;

// beforeAll(() => {
//   car = new Car("붕붕");
// });

beforeEach(() => {
  car = new Car("붕붕");
});

test("자동차는 이름을 상태로 가질 수 있다.", () => {
  expect(car.name).toBe("붕붕");
});

test("자동차는 위치 값을 가지며, 초기 상태는 0이다.", () => {
  expect(car.state).toBe(0);
});

test("자동차는 전진할 수 있으며 한 번에 1만큼 전진한다.", () => {
  //메서드 실행하기전 초기값 설정
  const initialState = car.state;
  //메서드 실행
  car.go();
  //메서드 실행후 state 값 저장
  const afterState = car.state;

  expect(afterState - initialState).toBe(1);
});
