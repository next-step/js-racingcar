import Game from "../src/Models/Game";
import Car from "../src/Models/Car";

const GAME_INIT_ROUND = Game.INITIAL_ROUND;
const TOTAL_GAME_ROUNDS = Game.TOTAL_ROUNDS;
const INPUT_ERROR_MESSAGE = Game.ERROR_MESSAGE;

const CAR_ERROR_MESSAGE = Car.ERROR_MESSAGE;

describe("[feature1] 사용자가 유효한 값을 입력하는지 검증한다.", () => {
  describe("사용자가 유효하지 않은 값을 입력하면, 에러를 반환한다.", () => {
    it("사용자 입력이 빈 값인 경우, 에러를 발생시킨다.", () => {
      expect(() => new Game("")).toThrow(INPUT_ERROR_MESSAGE.EMPTY);
    });

    it.each([
      "car1,   car2, car1,    car3, car2   ",
      "12345, aBcDe, !*_,     !*_, aBcDe",
      "test1, Test2, tEsT1, test1, TeSt1",
      "name1, name2, name1, name3, name2",
    ])("사용자 입력에 중복된 자동차명이 있는 경우 - %s", (input) => {
      expect(() => new Game(input)).toThrow(
        INPUT_ERROR_MESSAGE.DUPLICATE_CAR_NAME
      );
    });

    it.each([
      {
        name: "쉼표만 있는 값",
        input: ",",
        expected: INPUT_ERROR_MESSAGE.DUPLICATE_CAR_NAME,
      },
      {
        name: "쉼표가 연속으로 있는 값",
        input: "a,,   b, c",
        expected: CAR_ERROR_MESSAGE.EMPTY_NAME,
      },
      {
        name: "쉼표로 시작하는 값",
        input: ",a,b,c",
        expected: CAR_ERROR_MESSAGE.EMPTY_NAME,
      },
      {
        name: "쉼표로 끝나는 값",
        input: "a, b, c,",
        expected: CAR_ERROR_MESSAGE.EMPTY_NAME,
      },
    ])(
      "사용자 입력이 $name인 경우, 에러를 발생시킨다.",
      ({ input, expected }) => {
        expect(() => new Game(input)).toThrow(expected);
      }
    );

    it("사용자 입력에 5글자 이상인 자동차 이름이 있는 경우, 에러를 발생시킨다.", () => {
      expect(() => new Game("aaaaa, bbbbbb,cccccc")).toThrow(
        CAR_ERROR_MESSAGE.LONG_NAME
      );
    });
  });

  describe("사용자가 유효한 값을 입력하면, 정상 동작한다.", () => {
    it.each(["e", "er", "eri", "eric", "erica", "  _", "!!! "])(
      "쉼표 없이 자동차명만 입력한 경우 - %s",
      (input) => {
        expect(() => new Game(input)).not.toThrow();
      }
    );

    it.each([
      "car1, car2, car3",
      "apple, Peach, eGG",
      "12345, aBcDe, !*_",
      "test1, Test2, tEsT1, test2, TeSt1",
      "name1, name2, name3, name4, name5",
    ])("쉼표를 사용하여 여러 자동차명을 기입한 경우 - %s", (input) => {
      expect(() => new Game(input)).not.toThrow();
    });
  });
});

describe("[feature4] 총 5라운드를 반복하고, 우승 자동차 정보를 반환한다.", () => {
  const VALID_INPUT = "yun,yang,erica,star";
  const game = new Game(VALID_INPUT);

  it("게임 컨트롤러는 Car 객체를 갖는 배열, View 객체, 현재 라운드, 우승자 배열을 상태값으로 갖는다.", () => {
    expect(game.cars).toBeInstanceOf(Array);
    expect(game.currRound).toBeDefined();
    expect(game.currRound).toBe(GAME_INIT_ROUND);
    expect(game.winners).toBeInstanceOf(Array);
  });

  // TODO question) private method의 호출 횟수를 테스트하기 위해 별도의 변수를 추가했는데,
  // 테스트를 위한 코드는 프로덕션에서 분리하는게 좋다고 하셔서, 어떻게 해야할지 고민입니다.
  it("다섯 라운드가 진행된다.", () => {
    game.play();
    expect(game.currRound - 1).toBe(TOTAL_GAME_ROUNDS);
  });

  it("배열 형태로 우승자 정보를 반환한다.", () => {
    expect(game.winners).toBeInstanceOf(Array);
    expect(game.winners.length).toBeGreaterThan(0);
  });
});
