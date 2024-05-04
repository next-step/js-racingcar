import { ERROR_MESSAGES } from "../src/constants";
import { readLineAsync } from "../src/utils";
import { View } from "../src/views";
import { Car } from "../src/domain/Car";

jest.mock("../src/utils", () => ({
  readLineAsync: jest.fn(),
}));

describe("입/출력 테스트", () => {
  let logSpy;

  beforeEach(() => {
    logSpy = jest.spyOn(console, "log");
  });

  afterEach(() => {
    readLineAsync.mockReset();
    jest.restoreAllMocks();
  });

  test("자동차를 출력할 때 쉼표(,)를 기준으로 구분하며 전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.", async () => {
    // given
    const car1 = new Car("pobi");
    const car2 = new Car("crong");
    const car3 = new Car("honux");

    // when
    View.printRaceResult([car1, car2, car3]);

    // then
    expect(logSpy).toHaveBeenCalledWith("pobi : ");
    expect(logSpy).toHaveBeenCalledWith("crong : ");
    expect(logSpy).toHaveBeenCalledWith("honux : ");
  });

  test("우승자가 여러 명일 경우 쉼표(,)를 이용하여 구분하여 출력한다.", async () => {
    // given
    const car1 = new Car("pobi");
    const car2 = new Car("crong");
    const car3 = new Car("honux");

    // when
    View.printWinners([car1, car2, car3]);

    // then
    expect(logSpy).toHaveBeenCalledWith(
      `pobi, crong, honux가 최종 우승했습니다.`
    );
  });

  test("사용자는 몇 번의 이동을 할 것인지를 입력할 수 있어야 한다.", async () => {
    // given
    const RACE_ROUND = 5;
    readLineAsync.mockResolvedValue(RACE_ROUND.toString());

    // when
    const raceRound = await View.getRaceRoundPrompt();

    // then
    expect(raceRound).toBe(RACE_ROUND);
  });

  test("사용자는 몇 번의 이동을 할 것인지를 0이상의 정수만 입력가능하다", async () => {
    // given
    const RACE_ROUND = 5;
    readLineAsync
      .mockReturnValueOnce("abcd")
      .mockReturnValueOnce("-1")
      .mockReturnValueOnce("1.1")
      .mockReturnValueOnce(RACE_ROUND.toString());

    // when
    const raceRound = await View.getRaceRoundPrompt();

    // then
    expect(logSpy).toHaveBeenCalledWith(
      ERROR_MESSAGES.ERROR_INVALID_RACE_ROUND
    );
    expect(readLineAsync).toHaveBeenCalledTimes(4);
    expect(raceRound).toBe(RACE_ROUND);
  });
});
