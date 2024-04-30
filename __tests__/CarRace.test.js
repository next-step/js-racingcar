import { CarRace } from "../src/domains/CarRace";
import { CAR_RACE } from "../src/constants/carRace";
import { generateRandomNumber } from "../src/utils/generateRandomNumber";

describe("자동차 경주 테스트", () => {
  test("우승자는 한 명 이상일 수 있다.", () => {
    const carRace = new CarRace(["a", "b", "c"]);

    carRace.cars.map(car => car.move());
    const winner = carRace.getWinner();

    expect(winner.length).toEqual(3);
  });

  test(`랜덤 값은 ${CAR_RACE.MIN_RANDOM_NUMBER}~${CAR_RACE.MAX_RANDOM_NUMBER} 사이의 값이다.`, () => {
    const randomNumber = generateRandomNumber(
      CAR_RACE.MIN_RANDOM_NUMBER,
      CAR_RACE.MAX_RANDOM_NUMBER,
    );
    expect(randomNumber).toBeLessThanOrEqual(CAR_RACE.MAX_RANDOM_NUMBER);
    expect(randomNumber).toBeGreaterThanOrEqual(CAR_RACE.MIN_RANDOM_NUMBER);
  });

  test(`랜덤 값이 ${CAR_RACE.MOVE_THRESHOLD} 이상일 때 전진한다.`, () => {
    const randomNumber = CAR_RACE.MOVE_THRESHOLD;
    const carRace = new CarRace(["a"]);

    carRace.moveCar(carRace.cars.at(0), randomNumber);

    expect(carRace.cars.at(0).position).toEqual(1);
  });

  test("랜덤 값이 4 미만일 때는 전진하지 않는다.", () => {
    const randomNumber = CAR_RACE.MOVE_THRESHOLD - 1;
    const carRace = new CarRace(["a"]);

    carRace.moveCar(carRace.cars.at(0), randomNumber);

    expect(carRace.cars.at(0).position).toEqual(0);
  });
});
