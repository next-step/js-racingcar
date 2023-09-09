import { ERROR_MESSAGE, NUMBER_OF_MATCHES } from "../src/constants";
import Car from "../src/models/Car";
import Game from "../src/models/Game";
import Race from "../src/models/Race";
import { random } from "../src/utils/random";

describe("자동차 경주", () => {
  describe("자동차 객체 생성", () => {
    test("자동차에 이름을 부여할 수 있다.", () => {
      const car = new Car("pobi");
      expect(car.name).toBe("pobi");
    });

    test("자동차 이름은 5자 이하만 가능하다.", () => {
      expect(() => {
        const car = new Car("pobicronghonux");
      }).toThrow(ERROR_MESSAGE.EXCEED_MAXIMUM_NAME_LENGTH);
    });

    test("자동차의 기본 위치는 0이다.", () => {
      const car = new Car("pobi");
      expect(car.position).toBe(0);
    });
  });

  describe("레이싱 객체 생성", () => {
    test("자동차 경주는 5회로 고정하여 진행한다.", () => {
      const game = new Game();
      expect(game.totalMatches).toBe(NUMBER_OF_MATCHES);
    });

    test("자동차를 등록할 수 있다.", () => {
      const race = new Race();
      const names = "pobi,crong,honux";

      race.setCars(...names.split(","));
      const carNames = race.cars.map((car) => car.name).join(",");

      expect(carNames).toBe(names);
    });

    test("자동차가 전진하는 조건은 0에서 9 사이에서 무작위 값을 구한 후 무작위 값이 4 이상일 경우이다.", () => {
      const race = new Race();
      const car = new Car("pobi");
      const spy = jest.spyOn(race, "checkMove");
      spy.mockReturnValue(true);
      race.doMove(car);
      expect(car.position).toBe(1);
    });

    test("자동차 경주 게임을 완료한 후 누가 우승했는지를 알려준다. 우승자는 한 명 이상일 수 있다.", () => {
      const game = new Game();
      const spyGetNames = jest.spyOn(game, "getNames");

      const nameList = ["pobi", "crong", "honux"];
      spyGetNames.mockReturnValue(nameList);

      const spyCheckMove = jest.spyOn(game.race, "checkMove");
      spyCheckMove.mockReturnValue(true);

      game.start();
      const result = game.getResult();
      expect(result).toStrictEqual(nameList);
    });
  });

  test("랜덤 함수는 지정된 범위 내의 숫자만 반환한다.", () => {
    const number = random(0, 9);
    expect(number).toBeGreaterThanOrEqual(0);
    expect(number).toBeLessThanOrEqual(9);
  });

  test("자동차 이름을 받도록 입력을 구현한다.", () => {
    const game = new Game();
    const spy = jest.spyOn(game, "getNames");
    const nameList = ["pobi", "crong", "honux"];
    spy.mockReturnValue(nameList);
    game.start();
    const expected = game.race.cars.map((car) => car.name);
    expect(expected).toStrictEqual(nameList);
  });

  test("사용자가 잘못된 입력 값을 작성한 경우 프로그램을 종료한다.", () => {
    const game = new Game();
    const spy = jest.spyOn(game, "getNames");
    const nameList = [];
    spy.mockReturnValue(nameList);
    expect(() => {
      game.start();
    }).toThrow(ERROR_MESSAGE.LACK_OF_MINIMUM_CARS);
  });

  test("우승자가 여러 명일 경우 쉼표(,)를 이용하여 구분한다.", () => {
    const game = new Game();
    const spyLog = jest.spyOn(console, "log");
    const spyGetResult = jest.spyOn(game, "getResult");
    spyGetResult.mockReturnValue(["pobi", "honux"]);
    game.printWinners();
    expect(spyLog).toHaveBeenCalledWith("pobi, honux가 최종 우승했습니다.");
  });

  test("우승자가 없을 경우, 우승자가 없다는 문구를 표시한다.", () => {
    const game = new Game();
    const spyLog = jest.spyOn(console, "log");
    const spyGetResult = jest.spyOn(game, "getResult");
    spyGetResult.mockReturnValue([]);
    game.printWinners();
    expect(spyLog).toHaveBeenCalledWith("우승자가 없습니다.");
  });
});
