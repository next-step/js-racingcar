import Car from "../src/Car";
import { CAR_RACE_CONFIG } from "../src/constants";
import Race from "../src/Race";

describe("자동차 경주 테스트", () => {
  let race;

  beforeEach(() => {
    const carNameList = ["붕붕이", "씽씽이"];
    const carList = carNameList.map((name) => new Car(name));
    race = new Race(
      carList,
      CAR_RACE_CONFIG.RACE_COUNT,
      CAR_RACE_CONFIG.DISTANCE_PER_MOVE
    );
  });

  test(`자동차 경주는 ${CAR_RACE_CONFIG.RACE_COUNT}회 진행된다`, () => {
    const raceResult = race.start();
    expect(raceResult.length).toEqual(CAR_RACE_CONFIG.RACE_COUNT);
  });

  test(`자동차 경주 시 1회당 자동차는 ${CAR_RACE_CONFIG.DISTANCE_PER_MOVE}칸씩 전진한다`, () => {
    const car = new Car("붕붕이");
    race.moveCarPerRound(car);
    expect(car.position).toEqual(CAR_RACE_CONFIG.DISTANCE_PER_MOVE);
  });
});
