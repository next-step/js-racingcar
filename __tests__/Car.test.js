const Game = require('../src/domain/Game.js')
const Message = require('../src/constants/message.js')

const DEFAULT_NAME = "jun";
const carNames = "one,two,three";
const carNamesWithSpace = "one, two, three";

describe("자동차 이름 테스트", () => {
  test("자동차는 이름을 가질 수 있다", () => {
    Game.register(DEFAULT_NAME)
    expect(Game.cars[0].name).toBe(DEFAULT_NAME);
  });
  test("자동차 등록 및 이름 확인", () => {
    Game.register(carNames);

    expect(Game.cars.length).toBe(3);
    expect(Game.cars[0].name).toBe("one");
    expect(Game.cars[1].name).toBe("two");
    expect(Game.cars[2].name).toBe("three");
  });
  test("공백이 포함된 자동차 이름 등록", () => {
    Game.register(carNamesWithSpace);

    expect(Game.cars[0].name).toBe("one");
    expect(Game.cars[1].name).toBe("two");
    expect(Game.cars[2].name).toBe("three");
  });
  test.each([
    ["junjun", Message.ERROR.CAR_MAX_LENGTH],
    ["", Message.ERROR.CAR_MIN_LENGTH],
    ["123!!", Message.ERROR.CAR_NAME_ALPHABET],
  ])(
    "자동차 이름 테스트 : %s",
    (carName, msg) => {
      if (typeof msg === "string") {
        // 예외가 발생해야 하는 경우
        expect(() => {
          Game.register(carName);
        }).toThrow(msg);
      } else {
        // 정상적으로 등록되는 경우
        const car = Game.register(carName);
        expect(car.name).toBe(msg);
      }
    }
  );
});

describe("자동차 게임의 횟수 테스트", () => {
  test("숫자가 아닌 값이 전달되는 경우", () => {
    Game.declareCount('abc');
    expect(Game.race.totalCount).toBe(Message.RACE_COUNT);
  });

  const validCounts = [10, Message.RACE_COUNT];
  const invalidCounts = [101, 0, ''];

  test.each(validCounts)(
    "유효한 횟수 전달 : %s",
    (count) => {
      Game.declareCount(count);
      expect(Game.race.totalCount).toBe(count);
    }
  );

  test.each(invalidCounts)(
    "유효하지 않은 횟수 전달 : %s",
    (count) => {
      expect(() => {
        Game.declareCount(count);
      }).toThrow(count > 100 ? Message.ERROR.COUNT_MAX : Message.ERROR.COUNT_MIN);
    }
  );
});

describe("자동차 게임의 횟수 테스트", () => {
  test("우승자를 축하하는 메세지를 정확히 출력하는지 확인", () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    Game.register(carNames);

    Game.cars[0].position = 3;
    Game.cars[1].position = 2;
    Game.cars[2].position = 3;

    Game.congratulateWinner();

    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith(Message.WINNER(['one', 'three'], 3));

    consoleSpy.mockRestore();
  });
  test("동일한 위치에 있는 모든 자동차들이 우승자로 선정되는 경우", () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    Game.register(carNames);

    const samePosition = 5;
    Game.cars.forEach((car) => (car.position = samePosition));

    Game.congratulateWinner();

    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith(Message.WINNER(['one', 'two', 'three'], samePosition));

    consoleSpy.mockRestore();
  });

})

