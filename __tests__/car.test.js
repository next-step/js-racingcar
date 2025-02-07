import Car, { makeCar } from "../src/car";

jest.mock("readline");

import readline from "readline";

describe("차 인스턴스를 만든다.", () => {
  let car;

  beforeAll(() => {
    car = new Car("붕붕");
  });

  test("자동차는 인스턴스를 생성 할때 전달 받은 값을 이름으로 가진다.", () => {
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

describe("사용자가 입력한 값을 이름으로 가지는 차를 생성한다.", () => {
  let mockInterface;

  beforeEach(() => {
    mockInterface = {
      question: jest.fn(),
      close: jest.fn(),
    };

    readline.createInterface.mockReturnValue(mockInterface);
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("사용자가 입력한 값이 차의 이름이 됩니다.", async () => {
    mockInterface.question.mockImplementation((query, callback) => {
      callback("현대,기아,쌍용");
    });

    const carArr = await makeCar();

    expect(carArr).toEqual([new Car("현대"), new Car("기아"), new Car("쌍용")]);
  });

  it("사용자가 입력한 차의 이름이 5글자를 넘으면 에러가 발생합니다.", async () => {
    mockInterface.question.mockImplementation((query, callback) => {
      callback("현대기아자동차");
    });

    await expect(makeCar()).rejects.toThrow(
      "차 이름은 5글자 이하만 가능합니다."
    );
  });
});
