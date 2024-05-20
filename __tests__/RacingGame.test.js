import Car from "../src/domain/Car.js";
import RacingGame from "../src/domain/RacingGame.js";
import RandomNumberRaceStrategy from "../src/domain/RandomNumberRaceStrategy.js";

describe("자동차 경주 게임 기능 테스트", () => {
  test("가장 멀리 간 자동차의 이름을 반환한다.", () => {
    // given
    let cars = [];
    const carA = new Car("정민지"); // winner
    const carB = new Car("강보경");

    const game = new RacingGame(5);

    // when
    carA.move(6);
    carB.move(1);

    cars.push(carA);
    cars.push(carB);

    const winners = game.getWinners(cars);

    // then
    expect(winners[0].getName()).toBe("정민지");
  });

  test("입력된 자동차 이름은 , 로 구분하여 자동차가 생성된다.", () => {
    // given
    const inputNames = "aaa,bbb";

    const cars = inputNames.split(",").map((name) => new Car(name.trim()));

    const game = new RacingGame(5);

    // when
    const resultCars = game.createRacingCars(inputNames);

    // then
    expect(resultCars).toEqual(cars);
  });

  test("사용자가 경주 횟수를 입력하면 Racing 객체에 횟수가 저장된다.", () => {
    // given
    const racingCount = 9;

    // when
    const racingGame = new RacingGame(racingCount);

    // then
    expect(racingGame.getRacingTry()).toEqual(racingCount);
  });
});
