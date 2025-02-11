import { ERROR_MESSAGES } from "../src/utils/constants.js";
import Car from "../src/domain/Car.js";
import { carNames } from "../src/utils/constants.js";

describe("자동차 세팅 테스트 ", () => {
  describe("자동차는", () => {
    let car;
    beforeEach(() => {
      car = new Car(carNames.NEXT);
    });

    it("이름을 가진다", () => {
      expect(car.getName()).toEqual(carNames.NEXT);
    });

    it("위치 값을 가지며, 초기 값은 0이다.", () => {
      expect(car.getLocation()).toEqual(0);
    });
  });
});

describe("자동차 동작 테스트", () => {
  it(" 자동차는 전진할 수 있으며 한 번에 1만큼 전진한다.", () => {
    const car = new Car(carNames.NEXT);

    car.moveForward();

    expect(car.getLocation()).toEqual(1);
  });
});

describe("자동차에 이름을 부여할 수 있다.", () => {
  it("자동차는 생성 시 부여한 이름을 가진다.", () => {
    const car = new Car(carNames.GV80);
    expect(car.getName()).toBe(carNames.GV80);
  });

  it("자동차는 여러 대가 생성될 수 있다.", () => {
    const carArray = [carNames.GV80, carNames.G70];
    const cars = carArray.map((car) => new Car(car));
    expect(cars.map((car) => car.getName())).toEqual(carArray);
  });
});

describe("자동차 이름 유효성 테스트", () => {
  it("이름이 1자 미만이면 에러를 던진다.", () => {
    const car = () => new Car("");

    expect(car).toThrow(Error);
    expect(car).toThrow(ERROR_MESSAGES.INVALID_CAR_NAME);
  });

  it("이름이 1자면 유효성 검사에 통과한다.", () => {
    const car = () => new Car(carNames.N);

    expect(car).not.toThrow();
  });

  it("이름이 5자이면 유효성 검사에 통과한다.", () => {
    const car = () => new Car(carNames.MYCAR);

    expect(car).not.toThrow();
  });

  it("이름이 6자 이상이면 에러를 던진다.", () => {
    const car = () => new Car(carNames.NEXTSTEP);

    expect(car).toThrow(Error);
    expect(car).toThrow(ERROR_MESSAGES.INVALID_CAR_NAME);
  });
});
