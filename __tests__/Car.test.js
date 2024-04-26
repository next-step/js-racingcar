import { CAR } from "../src/constants/car";
import { Car } from "../src/domains/Car";
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
      CAR.MIN_RANDOM_NUMBER,
      CAR.MAX_RANDOM_NUMBER
    );
    expect(randomNumber).toBeLessThanOrEqual(CAR.MAX_RANDOM_NUMBER);
    expect(randomNumber).toBeGreaterThanOrEqual(CAR.MIN_RANDOM_NUMBER);
  });
});
