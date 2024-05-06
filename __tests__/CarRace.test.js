import { CarRace } from "../src/domains/CarRace";
import { CAR_RACE } from "../src/constants/carRace";
import { generateRandomNumber } from "../src/utils/generateRandomNumber";
import { Car } from "../src/domains/Car";

describe("자동차 경주 테스트", () => {
  let singleCar;
  let singleCarRace;

  beforeEach(() => {
    singleCar = new Car("a");
    singleCarRace = new CarRace([singleCar]);
  });

  test("우승자는 한 명 이상일 수 있다.", () => {
    const carNames = ["a", "b", "c"];
    const carInstance = carNames.map(carName => new Car(carName));
    carInstance.map(car => car.move());
    const carRace = new CarRace(carInstance);

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

    singleCarRace.moveCar("a", randomNumber);

    expect(singleCar.position).toEqual(1);
  });

  test(`랜덤 값이  ${CAR_RACE.MOVE_THRESHOLD} 미만일 때는 전진하지 않는다.`, () => {
    const randomNumber = CAR_RACE.MOVE_THRESHOLD - 1;

    singleCarRace.moveCar("a", randomNumber);

    expect(singleCar.position).toEqual(0);
  });

  test("사용자가 입력한 시도 횟수만큼 게임이 진행된다.", () => {
    const inputTryCount = 8;

    singleCarRace.totalUnitRound(8);

    expect(singleCarRace.result.length).toEqual(inputTryCount);
  });
});
