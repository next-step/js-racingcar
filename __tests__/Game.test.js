import { Cars } from "../src/Models/Cars";
import { Game } from "../src/Models/Game";

describe("사용자가 유효한 값을 입력한 경우, 게임을 세팅한다.", () => {
  it("사용자 입력이 빈 값인 경우, 에러를 발생시킨다.", () => {
    // CHECK 테스트 코드를 위해 public으로 빼는게 맞는지?
    expect(() => Game.setGame()).toThrow(Game.ERROR_MESSAGE.EMPTY);
  });

  describe("사용자가 유효한 값을 입력하면, 자동차 배열을 생성한다.", () => {
    it.each(["e", "er", "eri", "eric", "erica", "  _", "!!! "])(
      "자동차 이름을 하나만 입력한 경우",
      (userInput) => {
        expect(() => Game.setGame(userInput)).not.toThrow();
        // CHECK : 자동차 배열이 private 필드라 접근 불가 -> 어떻게 테스트코드 작성?
      }
    );

    it.each([
      "car1, car2, car3",
      "apple, Peach, eGG",
      "12345, aBcDe, !*_",
      "test1, Test2, tEsT1, test2, TeSt1",
      "name1, name2, name3, name4, name5",
    ])("중복 없이 자동차 이름을 여러 개 입력한 경우", (userInput) => {
      expect(() => Game.setGame(userInput)).not.toThrow();
      // CHECK : 자동차 배열이 private 필드라 접근 불가 -> 어떻게 테스트코드 작성?
    });
  });
});

describe("게임을 총 5라운드를 진행하고, 게임 결과를 반환한다.", () => {
  Game.setGame("hyun, ja, yeo, yang, erica, star");
  const spyPlayOneRound = jest.spyOn(Cars, "playOneRound");
  Game.playGame();

  describe("게임은 총 다섯 라운드를 진행한다.", () => {
    it("각 라운드를 진행하는 함수를 5번 호출한다.", () => {
      expect(spyPlayOneRound).toBeCalledTimes(5);
    });

    it("각 라운드 별 기록을 roundHistory에 저장한다.", () => {
      expect(Game.getGameResult().roundHistory.length).toBe(5);
    });
  });

  describe("다섯 라운드의 게임 기록과 우승자 정보를 반환한다.", () => {
    it("다섯 라운드의 게임 기록을 반환한다.", () => {
      expect(Game.getGameResult().roundHistory.length).toBe(5);
    });

    it("라운드 게임 기록은 Car의 이름과 위치를 저장한 객체 배열 형태이다.", () => {
      const roundRecord = Game.getGameResult().roundHistory[0];
      roundRecord.forEach((carRecord) => {
        expect(carRecord).toHaveProperty("name");
        expect(carRecord).toHaveProperty("position");
      });
    });

    // CHECK 우승자 정보가 정확한지 체크하는 테스트 코드 작성
  });
});
