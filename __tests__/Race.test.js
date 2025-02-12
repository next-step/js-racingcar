import Car from "../src/domain/Car";
import Race from "../src/domain/Race";
import { CAR_NAMES, ROUNDS } from "../src/utils/constants";

describe("기본 경주 테스트", () => {
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

    it("경주는 기본 5회로 진행한다.", () => {
      expect(race.rounds).toBe(Race.DEFAULT_ROUNDS);
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
      const firstRound = result.find(
        (round) => round.round === ROUNDS.ONE * MOVE_DISTANCE
      );
      const allCarsFirstMovedLocation = firstRound.cars.every(
        (car) => car.location === ROUNDS.ONE
      );

      expect(allCarsFirstMovedLocation).toBeTruthy();
    });

    it("5회에는 다섯 칸 이동한다.", () => {
      const finalRound = result.find(
        (round) => round.round === ROUNDS.FIVE * MOVE_DISTANCE
      );
      const allCarsFinalLocation = finalRound.cars.every(
        (car) => car.location === ROUNDS.FIVE * MOVE_DISTANCE
      );

      expect(allCarsFinalLocation).toBeTruthy();
    });
  });
});

describe("사용자 입력 경주 테스트", () => {
  it("사용자가 10을 입력하면 경주를 10회 진행한다.", () => {
    const cars = [new Car(CAR_NAMES.G70), new Car(CAR_NAMES.GV80)];
    const race = new Race(cars, ROUNDS.TEN);

    expect(race.rounds).toBe(ROUNDS.TEN);
  });
});
