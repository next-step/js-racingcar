import RacingGame, { SEPARATOR } from "../src/RacingGame";
import { ERROR_MSG } from "../src/contants/messages";

describe("경주할 자동차 입력", () => {
  test("여러 자동차의 이름이 콤마로 구분해서 올 수 있다.", () => {
    const players = ["jang", "kim"];
    const carsStr = players.join(SEPARATOR);

    const racingGame = new RacingGame();
    racingGame.setPlayers(carsStr);
    racingGame.getPlayers().forEach((car, index) => {
      expect(car.getName()).toBe(players[index]);
    });
  });

  test("중복되는 이름은 허용하지 않는다.", () => {
    const racingGame = new RacingGame();
    expect(() => {
      racingGame.setPlayers("jang,jang,kim");
    }).toThrow(ERROR_MSG.UINIQUE);
  });
});
