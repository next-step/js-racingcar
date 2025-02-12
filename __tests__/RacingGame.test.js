import Car from "../src/Car";
import RacingGame from "../src/RacingGame";

describe("자동차 경주 테스트", () => {
  it("자동차 경주는 기본적으로 최대 5라운드로 진행된다.", () => {
    const cars = [new Car("벤츠"), new Car("BMW"), new Car("아우디")];

    const racingGame = new RacingGame(cars);
    const raceIterator = racingGame.startRace();

    while (!raceIterator.next().done) {}

    expect(racingGame.round).toBe(5);
  });

  it("자동차 경주는 설정된 라운드만큼 진행된다.", () => {
    const cars = [new Car("벤츠"), new Car("BMW"), new Car("아우디")];

    const racingGame = new RacingGame(cars, 7);
    const raceIterator = racingGame.startRace();

    while (!raceIterator.next().done) {}

    expect(racingGame.round).toBe(7);
  });

  test("자동차는 기본적으로 각 라운드마다 1칸씩 전진한다.", () => {
    const cars = [new Car("벤츠"), new Car("BMW"), new Car("아우디")];

    const totalRound = 6;
    const racingGame = new RacingGame(cars, totalRound);
    const raceIterator = racingGame.startRace();

    cars.forEach((car) => expect(car.position).toBe(0));

    for (let position = 1; position <= totalRound; position++) {
      const result = raceIterator.next().value;
      result.forEach((car) => expect(car.position).toBe(position));
    }
  });

  test("자동차는 각 라운드에서 전진 조건에 따라 전진하거나 전진하지 않는다..", () => {
    const cars = [new Car("벤츠"), new Car("BMW"), new Car("아우디")];

    const racingGame = new RacingGame(cars);
    const raceIterator = racingGame.startRace(() => Math.random() >= 0.5); // 랜덤값이 0.5 이상일 때 전진하도록 설정

    jest.spyOn(Math, "random").mockReturnValue(0.5);

    const roundResult1 = raceIterator.next().value;
    roundResult1.forEach((car) => expect(car.position).toBe(1));

    jest.spyOn(Math, "random").mockReturnValue(0.2);

    const roundResult2 = raceIterator.next().value;
    roundResult2.forEach((car) => expect(car.position).toBe(1));

    jest.restoreAllMocks();
  });
});
