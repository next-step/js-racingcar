import { Car } from "../src/Car";
import { ERROR_CODE, Game } from "../src/Game";

describe("Game Class 기본적인 요소에 대해 테스트 한다.", () => {
  /**
   * ## 자동차 이름은 쉼표(,)를 기준으로 구분하며 이름은 5자 이하만 가능하다.
   * ## 자동차 경주는 5회로 고정하여 진행한다.
   * ## 전진하는 조건은 0에서 9 사이에서 무작위 값을 구한 후 무작위 값이 4 이상일 경우이다.
   * ## 자동차 경주 게임을 완료한 후 누가 우승했는지를 알려준다. 우승자는 한 명 이상일 수 있다.
   * ## 우승자가 여러 명일 경우 쉼표(,)를 이용하여 구분한다.
   * ## 사용자가 잘못된 입력 값을 작성한 경우 프로그램을 종료한다.
   */

  test("자동차 배열을 가진 Game 인스턴스를 생성할 수 있다.", () => {
    const game = new Game();

    const cars = game.cars;

    expect(cars instanceof Array).toBe(true);
  });

  test("자동차 이름이 입력되면 ,를 기준을 배열로 만들어준다.", () => {
    const game = new Game();

    const carString = "차1,차2,차3,차4";
    const cars = game.getCarsByCarsString(carString.trim());

    expect(cars instanceof Array).toBe(true);
    expect(cars.length).toBe(4);
  });

  test("자동차 이름이 하나만 입력되는 경우에도 자동차 배열이 만들어 진다.", () => {
    const game = new Game();

    const carString = "차1";
    const cars = game.getCarsByCarsString(carString.trim());

    expect(cars instanceof Array).toBe(true);
    expect(cars.length).toBe(1);
  });

  test("자동차 이름이 5글자가 넘으면 INVALID_CAR_NAME 에러코드가 반환 된다.", () => {
    const game = new Game();

    const carString = "차1123,차2,차3,차4";
    const cars = game.getCarsByCarsString(carString.trim());

    expect(cars).toBe(ERROR_CODE.INVALID_CAR_NAME);
  });

  test("자동차 이름이 없으면 NO_VALUE 에러코드가 반환 된다.", () => {
    const game = new Game();

    const noValueCarName = "";
    const noValueCars = game.getCarsByCarsString(noValueCarName.trim());

    const emptyCarName = "차,";
    const emptyCars = game.getCarsByCarsString(emptyCarName.trim());

    expect(noValueCars).toBe(ERROR_CODE.NO_VALUE);
    expect(emptyCars).toBe(ERROR_CODE.NO_VALUE);
  });

  test("중복된 자동차 이름이 있으면 DUPLICATE 에러코드가 반환 된다.", () => {
    const game = new Game();

    const carString = "차2,차2,차3,차4";
    const cars = game.getCarsByCarsString(carString.trim());

    expect(cars).toBe(ERROR_CODE.DUPLICATE);
  });
});

describe("게임 플레이 테스트(play 메서드)", () => {
  test("플레이 타임이 5번이 넘지 않았으면 true를 반환한다.", () => {
    const game = new Game();

    const result1 = game.play();
    const result2 = game.play();
    const result3 = game.play();
    const result4 = game.play();
    const result5 = game.play();

    expect(result1).toBe(true);
    expect(result2).toBe(true);
    expect(result3).toBe(true);
    expect(result4).toBe(true);
    expect(result5).toBe(true);
  });

  test("플레이 타임이 5번이 넘으면 false를 반환한다.", () => {
    const game = new Game();

    game.play();
    game.play();
    game.play();
    game.play();
    game.play();
    const result = game.play();
    expect(result).toBe(false);
  });

  test("자동차들 중에 승리 횟수가 가장 많은 자동차 배열을 구할 수 있다", () => {
    const game = new Game();
    const testCar1 = new Car();
    const testCar2 = new Car();
    const testCar3 = new Car();
    const testCar4 = new Car();

    game.setCar(testCar1);
    game.setCar(testCar2);
    game.setCar(testCar3);
    game.setCar(testCar4);

    testCar1.win();
    testCar1.win();
    testCar1.win();

    testCar2.win();
    testCar2.win();

    testCar3.win();
    testCar3.win();

    testCar4.win();
    testCar4.win();
    testCar4.win();

    const winers = game.getWinners();
    expect(winers).toEqual([testCar1, testCar4]);
  });
});
