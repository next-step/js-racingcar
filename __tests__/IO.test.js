import {
  ERROR_CAR_NAME_TOO_LONG,
  ERROR_CAR_RACE_COUNT_NOT_VALID,
} from "../src/constants/error.js";
import Car from "../src/domain/Car.js";
import * as io from "../src/utils/readLineAsync.js";
import CarRace from "../src/domain/CarRace.js";
import Input from "../src/view/Input.js";
import Output from "../src/view/Output.js";

const logSpy = jest.spyOn(console, "log");
const readLineAsyncSpy = jest.spyOn(io, "readLineAsync");

beforeEach(() => {
  logSpy.mockClear();
  readLineAsyncSpy.mockClear();
});

describe("입출력 테스트", () => {
  test("자동차 이름이 여러 개 입력되었을 때 모든 이름이 5글자 이하이면 입력이 정상적으로 종료된다.", async () => {
    // given
    readLineAsyncSpy.mockImplementationOnce(() =>
      Promise.resolve("ganu,crong,honux")
    );

    // when
    const carNames = await Input.getCarNamesFromUserInput();

    // then
    expect(readLineAsyncSpy).toHaveBeenCalledTimes(1);
    expect(carNames).toStrictEqual(["ganu", "crong", "honux"]);
  });

  test("자동차 이름이 여러 개 입력되었을 때 한 개 이상의 자동차 이름이 5글자 초과이면 에러메시지 출력 후 정상적인 입력이 들어올 때까지 무한 반복한다.", async () => {
    // given
    readLineAsyncSpy
      .mockImplementationOnce(() => Promise.resolve("longerThan5,crong,honux"))
      .mockImplementationOnce(() => Promise.resolve("ganu,crong,honux"));

    // when
    const carNames = await Input.getCarNamesFromUserInput();

    // then
    expect(logSpy).toHaveBeenCalledWith(ERROR_CAR_NAME_TOO_LONG);
    expect(readLineAsyncSpy).toHaveBeenCalledTimes(2);
    expect(carNames).toStrictEqual(["ganu", "crong", "honux"]);
  });

  test("자동차 경주에서 진행할 라운드 횟수를 입력할 때 0 이상의 정수를 입력한 경우 입력이 정상적으로 종료된다.", async () => {
    // given
    readLineAsyncSpy.mockImplementationOnce(() => Promise.resolve("1"));

    // when
    const totalCount = await Input.getTotalRaceCountFromUserInput();

    // then
    expect(readLineAsyncSpy).toHaveBeenCalledTimes(1);
    expect(totalCount).toBe(1);
  });

  test("자동차 경주에서 진행할 라운드 횟수를 입력할 때 0 미만의 정수 또는 정수가 아닌 값을 입력한 경우 에러 메시지를 출력하고 0 이상의 정수가 입력될 때까지 무한 반복한다.", async () => {
    // given
    readLineAsyncSpy
      .mockImplementationOnce(() => Promise.resolve("-1"))
      .mockImplementationOnce(() => Promise.resolve("1.3"))
      .mockImplementationOnce(() => Promise.resolve("abc"))
      .mockImplementationOnce(() => Promise.resolve("5"));

    // when
    const totalCount = await Input.getTotalRaceCountFromUserInput();

    // then
    expect(logSpy).toHaveBeenCalledWith(ERROR_CAR_RACE_COUNT_NOT_VALID);
    expect(readLineAsyncSpy).toHaveBeenCalledTimes(4);
    expect(totalCount).toBe(5);
  });

  test("자동차 경주는 여러 개의 라운드로 이루어져 있으며, 각 라운드는 자동차들의 이름과 현재 위치를 출력한다", () => {
    // given
    const car1 = new Car("ganu");
    const car2 = new Car("toto");
    const carRace = new CarRace([car1, car2], 1);
    carRace.race();

    // when
    Output.printCarRaceRoundsResult(carRace);

    // then
    expect(logSpy).toHaveBeenCalledWith(expect.stringMatching(/ganu : [-+]?/));
    expect(logSpy).toHaveBeenCalledWith(expect.stringMatching(/toto : [-+]?/));
    expect(logSpy).toHaveBeenCalledWith();
  });

  test("자동차 경주의 우승자를 출력할 때 우승자가 여러 명일 경우 쉼표(,)로 구분하여 출력한다.", () => {
    // given
    const car1 = new Car("pobi");
    const car2 = new Car("crong");
    const car3 = new Car("honux");
    const carRace = new CarRace([car1, car2, car3]);

    // when
    Output.printCarRaceWinners(carRace.winnerNames.join(", "));

    // then
    expect(logSpy).toHaveBeenCalledWith(
      "pobi, crong, honux가 최종 우승했습니다."
    );
  });
});
