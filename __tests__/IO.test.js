import Controller from "../src/controller.js";
import { displayForwardCar } from "../src/view.js";
import Car from "../src/domain/Car.js";
import Race from "../src/domain/Race.js";

describe("자동차/경주 입력 구현 테스트", () => {
  test("경주할 자동차를 입력할 때, 이름은 쉼표를 기준으로 구분한다.", async () => {
    //given
    const race = new Race();
    const controller = new Controller(race);
    const correctCarNames = "pobi,crong,honux";
    const mockAskCarNames = jest.fn(() => correctCarNames);

    //when
    await controller.initCarNames(mockAskCarNames);
    const raceCars = race.cars;

    //then
    expect(raceCars.at(0).name).toBe("pobi");
    expect(raceCars.at(1).name).toBe("crong");
    expect(raceCars.at(2).name).toBe("honux");
  });

  test("사용자는 몇 번의 이동을 할 것인지 입력할 수 있어야 한다.", async () => {
    //given
    const race = new Race();
    const controller = new Controller(race);
    const maxRound = 10;
    const mockAskMaxRound = jest.fn(() => maxRound);

    //when
    await controller.initMaxRound(mockAskMaxRound);

    //then
    expect(race.maxRound).toBe(10);
  });
});

describe("사용자가 잘못된 입력 값을 작성한 경우 에러 메시지를 보여준다.", () => {
  let errorSpy;
  let mockGetCarNames;
  let mockGetMaxRound;
  let race;
  let controller;

  beforeEach(() => {
    errorSpy = jest.spyOn(global.console, "error");
    mockGetCarNames = jest.fn();
    mockGetMaxRound = jest.fn();
    race = new Race();
    controller = new Controller(race);
  });

  afterEach(() => {
    errorSpy.mockClear();
    mockGetCarNames.mockClear();
    mockGetMaxRound.mockClear();
    controller = null;
    race = null;
  });

  test("사용자가 잘못된 자동차 이름을 작성한 경우 에러 메시지를 보여준다.", async () => {
    //given
    const carNameOver5 = "pobi,crong,honuxi";
    const correctCarNames = "pobi,crong,honux";
    mockGetCarNames
      .mockImplementationOnce(() => carNameOver5)
      .mockImplementationOnce(() => correctCarNames);

    //when
    await controller.initCarNames(mockGetCarNames);

    //then
    expect(errorSpy).toHaveBeenCalledWith(
      "자동차 이름은 5자 이하만 가능합니다."
    );
  });

  test("사용자가 자동차 이름을 작성하지 않은 경우 에러 메시지를 보여준다.", async () => {
    //given
    const noInput = "";
    const correctCarNames = "pobi,crong,honux";
    mockGetCarNames
      .mockImplementationOnce(() => noInput)
      .mockImplementationOnce(() => correctCarNames);

    //when
    await controller.initCarNames(mockGetCarNames);

    //then
    expect(errorSpy).toHaveBeenCalledWith("자동차 이름을 입력해주세요.");
  });

  test("사용자가 라운드 값을 0이하로 작성한 경우 에러 메시지를 보여준다.", async () => {
    //given
    const underZeroNumber = -1;
    const correctInput = 5;
    mockGetMaxRound
      .mockImplementationOnce(() => underZeroNumber)
      .mockImplementationOnce(() => correctInput);

    //when
    await controller.initMaxRound(mockGetMaxRound);

    //then
    expect(errorSpy).toHaveBeenCalledWith("시도할 횟수는 0보다 커야합니다.");
  });

  test("사용자가 라운드 값을 string으로 작성한 경우 에러 메시지를 보여준다.", async () => {
    //given
    const stringInput = "six";
    const correctInput = 5;
    mockGetMaxRound
      .mockImplementationOnce(() => stringInput)
      .mockImplementationOnce(() => correctInput);

    //when
    await controller.initMaxRound(mockGetMaxRound);

    //then
    expect(errorSpy).toHaveBeenCalledWith("시도할 횟수는 숫자여야합니다.");
  });

  test("사용자가 라운드 값을 작성하지 않은 경우 에러 메시지를 보여준다.", async () => {
    //given
    const noInput = "";
    const correctInput = 5;
    mockGetMaxRound
      .mockImplementationOnce(() => noInput)
      .mockImplementationOnce(() => correctInput);

    //when
    await controller.initMaxRound(mockGetMaxRound);

    //then
    expect(errorSpy).toHaveBeenCalledWith("시도할 횟수를 입력해주세요.");
  });
});

describe("사용자가 잘못된 입력 값을 작성한 경우 다시 입력할 수 있게 한다.", () => {
  let race;
  let controller;

  beforeEach(() => {
    race = new Race();
    controller = new Controller(race);
  });

  afterEach(() => {
    race = null;
    controller = null;
  });

  test("사용자가 잘못된 자동차 이름을 입력한 경우 다시 자동차 이름을 입력할 수 있게 한다.", async () => {
    //given
    const carNameOver5 = "pobi,crong,honuxi";
    const noInput = "";
    const correctCarNames = "pobi,crong,honux";
    const mockAskCarNames = jest.fn();
    mockAskCarNames
      .mockImplementationOnce(() => carNameOver5)
      .mockImplementationOnce(() => noInput)
      .mockImplementationOnce(() => correctCarNames);

    //when
    await controller.initCarNames(mockAskCarNames);

    //then
    expect(mockAskCarNames).toHaveBeenCalledTimes(3);
  });

  test("사용자가 잘못된 라운드 횟수를 입력한 경우 다시 이동횟수를 입력할 수 있게한다.", async () => {
    //given
    const string = "six";
    const noInput = "";
    const negative = -1;
    const zero = 0;
    const decimal = 1.5;
    const correctRound = 4;
    const mockGetMaxRound = jest.fn();
    mockGetMaxRound
      .mockImplementationOnce(() => string)
      .mockImplementationOnce(() => noInput)
      .mockImplementationOnce(() => negative)
      .mockImplementationOnce(() => zero)
      .mockImplementationOnce(() => decimal)
      .mockImplementationOnce(() => correctRound);

    //when
    await controller.initMaxRound(mockGetMaxRound);

    //then
    expect(mockGetMaxRound).toHaveBeenCalledTimes(6);
  });
});

describe("자동차 경주 상황 출력 구현", () => {
  let logSpy;

  beforeEach(() => {
    logSpy = jest.spyOn(global.console, "log");
  });

  afterEach(() => {
    logSpy.mockClear();
  });

  test("전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.", () => {
    //given
    const car = new Car("pobi");
    car.moveForward();

    //when
    displayForwardCar(car);

    //then
    expect(logSpy).toHaveBeenCalledWith("pobi : -");
  });

  test("게임 완료 후 우승자를 출력한다.", async () => {
    //given
    const race = new Race();
    const controller = new Controller(race);
    const getCarNames = () => "pobi,crong,honux";
    const getRound = () => 5;
    await controller.initCarNames(getCarNames);
    await controller.initMaxRound(getRound);
    controller.playRaceGame();

    //when
    const winners = race.winners;
    controller.finish();

    //then
    expect(logSpy).toHaveBeenCalledWith(
      `${winners.map(({ name }) => name).join(", ")}가 최종 우승했습니다.`
    );
  });
});
