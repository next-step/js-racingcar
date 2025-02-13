import Car from "../src/domain/Car";
import RacingGame, { InvalidRacingTotalRound } from "../src/domain/RacingGame";

describe("자동차 경주 테스트", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("자동차 경주는 기본적으로 최대 5라운드로 진행된다.", () => {
    const cars = [new Car("벤츠"), new Car("BMW"), new Car("아우디")];

    const racingGame = new RacingGame(cars);
    const raceIterator = racingGame.runRace();

    expect([...raceIterator].length).toBe(5);
  });

  it("자동차 경주는 설정된 라운드만큼 진행된다.", () => {
    const cars = [new Car("벤츠"), new Car("BMW"), new Car("아우디")];

    const racingGame = new RacingGame(cars, 7);
    const raceIterator = racingGame.runRace();

    expect([...raceIterator].length).toBe(7);
  });

  it.each([Number.NaN, -1, 0, 3.5, "4", true])(
    "자동차 경주의 총 라운드 값은 1 이상의 정수여야 한다. (총 라운드: %p)",
    (totalRound) => {
      const cars = [new Car("벤츠"), new Car("BMW"), new Car("아우디")];

      expect(() => new RacingGame(cars, totalRound)).toThrow(
        InvalidRacingTotalRound
      );
    }
  );

  it("자동차는 기본적으로 각 라운드마다 1칸씩 전진한다.", () => {
    const cars = [new Car("벤츠"), new Car("BMW"), new Car("아우디")];

    cars.forEach((car) => expect(car.position).toBe(0));

    const racingGame = new RacingGame(cars, 6);
    const raceResults = [...racingGame.runRace()];

    // 예상 자동차 위치 변화
    const expectedPositions = [
      [1, 1, 1],
      [2, 2, 2],
      [3, 3, 3],
      [4, 4, 4],
      [5, 5, 5],
      [6, 6, 6],
    ];

    raceResults.forEach((roundResult, roundIndex) => {
      roundResult.forEach((car, carIndex) => {
        expect(car.position).toBe(expectedPositions[roundIndex][carIndex]);
      });
    });
  });

  it("자동차는 각 라운드에서 전진 조건에 따라 전진하거나 전진하지 않는다.", () => {
    const cars = [new Car("벤츠"), new Car("BMW"), new Car("아우디")];

    const raceConditions = [
      [true, false, true], // 라운드 1: 벤츠, 아우디 전진, BMW 멈춤
      [false, true, true], // 라운드 2: BMW, 아우디 전진, 벤츠 멈춤
      [false, true, false], // 라운드 3: BMW 전진, 벤츠, 아우디 멈춤
    ].flat();

    const canMove = () => raceConditions.shift();
    const racingGame = new RacingGame(cars, 3, canMove);

    const raceResults = [...racingGame.runRace()];

    const expectedPositions = [
      [1, 0, 1], // (라운드 1) 벤츠: 전진, BMW: 멈춤, 아우디: 전진
      [1, 1, 2], // (라운드 2) 벤츠: 멈춤, BMW: 전진, 아우디: 전진
      [1, 2, 2], // (라운드 3) 벤츠: 멈춤, BMW: 전진, 아우디: 멈춤
    ];

    raceResults.forEach((roundResult, roundIndex) => {
      roundResult.forEach((car, carIndex) => {
        expect(car.position).toBe(expectedPositions[roundIndex][carIndex]);
      });
    });
  });

  it("자동차 경주 우승자는 가장 멀리 전진한 자동차들이다.", () => {
    const cars = [new Car("벤츠"), new Car("BMW"), new Car("아우디")];

    const racingGame = new RacingGame(cars);

    cars[0].position = 5;
    cars[1].position = 3;
    cars[2].position = 5;

    const winners = racingGame.getWinners();

    expect(winners).toEqual(["벤츠", "아우디"]);
  });
});
