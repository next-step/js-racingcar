import { CAR_RACE } from "../src/constants/carRace";
import { Car } from "../src/domains/Car";
import { CarRace } from "../src/domains/CarRace";
import { generateRandomNumber } from "../src/utils/generateRandomNumber";

describe("자동차 기능 테스트", () => {
  test("자동차는 전진할 수 있다.", () => {
    const car = new Car("Hellol77");

    car.move();
    car.move();

    expect(car.position).toEqual(2);
  });

  test("랜덤 값은 0~9 사이의 값이다.", () => {
    const randomNumber = generateRandomNumber(
      CAR_RACE.MIN_RANDOM_NUMBER,
      CAR_RACE.MAX_RANDOM_NUMBER
    );
    expect(randomNumber).toBeLessThanOrEqual(CAR_RACE.MAX_RANDOM_NUMBER);
    expect(randomNumber).toBeGreaterThanOrEqual(CAR_RACE.MIN_RANDOM_NUMBER);
  });

  test("랜덤 값이 4 이상일 때 전진한다.", () => {
    const randomNumber = 4;
    const carRace = new CarRace(["a"]);

    carRace.moveCar(carRace.cars[0], randomNumber);

    expect(carRace.cars[0].position).toEqual(1);
  });

  test("랜덤 값이 4 미만일 때는 전진하지 않는다.", () => {
    const randomNumber = 3;
    const carRace = new CarRace(["a"]);

    carRace.moveCar(carRace.cars[0], randomNumber);

    expect(carRace.cars[0].position).toEqual(0);
  });
});
