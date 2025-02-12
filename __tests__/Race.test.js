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

  describe("경주 결과 테스트", () => {
    it("경주가 끝나면 결과를 반환한다.", () => {
      expect(race.start()).toEqual(race.result);
    });

    it("우승자 조회시 우승자 목록을 반환한다.", () => {
      race.start();

      expect(race.getWinners().length).toBeGreaterThan(0);
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
