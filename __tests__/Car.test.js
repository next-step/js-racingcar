import { playGame } from "../src/Controller.js";
import Car from "../src/domain/Car.js";
import Race from "../src/domain/Race.js";

describe("자동차 구현 테스트", () => {
  test("자동차에 이름을 부여할 수 있다.", () => {
    const car = new Car("pobi");
    expect(car.name).toBe("pobi");
  });

  test("자동차 이름이 5자 초과인 경우 에러를 발생시킨다.", () => {
    const carNameOver5 = "saemileee";
    expect(() => new Car(carNameOver5)).toThrow(
      "자동차 이름은 5자 이하만 가능합니다."
    );
  });
});

describe("자동차 이름 입력 구현 테스트", () => {
  test("자동차 이름은 쉼표를 기준으로 구분한다.", () => {
    const playGame = new playGame("pobi,crong,honux");

    const raceCars = race.races;

    expect(raceCars[0].name).toBe("pobi");
    expect(raceCars[1].name).toBe("crong");
    expect(raceCars[2].name).toBe("honux");
  });

  test("사용자가 잘못된 입력 값을 작성한 경우 프로그램을 종료한다.", () => {
    const wrongInput = "pobi, crong, honux123";

    expect(() => new playGame(wrongInput)).toThrow(Error);
  });
});
