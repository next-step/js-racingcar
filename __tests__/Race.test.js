import Car from "../src/domain/Car";
import Race from "../src/domain/Race";

describe("경주 테스트", () => {
  let cars;
  let race;

  beforeEach(() => {
    cars = [new Car("GV80"), new Car("G90")];
    race = new Race(cars);
  });

  describe("경주 초기화", () => {
    it("경주 시작 시 자동차를 갖는다.", () => {
      expect(race.cars).toEqual(cars);
    });

    it("경주는 5회로 고정하여 진행한다.", () => {
      const DEFAULT_ROUNDS = 5;
      expect(race.rounds).toBe(DEFAULT_ROUNDS);
    });
  });

  describe("자동차는 1회당 한 칸씩 전진한다.", () => {
    const MOVE_DISTANCE = 1;
    let result;

    beforeEach(() => {
      race.start();
      result = race.result;
    });

    it("1회에는 한 칸 이동한다.", () => {
      const FIRST_ROUND = 1;

      const firstRound = result.find(
        (round) => round.round === FIRST_ROUND * MOVE_DISTANCE
      );
      const allCarsFirstMovedLocation = firstRound.cars.every(
        (car) => car.location === FIRST_ROUND
      );

      expect(allCarsFirstMovedLocation).toBeTruthy();
    });

    it("5회에는 다섯 칸 이동한다.", () => {
      const TOTAL_ROUND = 5;

      const finalRound = result.find(
        (round) => round.round === TOTAL_ROUND * MOVE_DISTANCE
      );
      const allCarsFinalLocation = finalRound.cars.every(
        (car) => car.location === TOTAL_ROUND * MOVE_DISTANCE
      );

      expect(allCarsFinalLocation).toBeTruthy();
    });
  });
});
