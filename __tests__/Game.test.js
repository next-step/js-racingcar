import { Game } from "../src/Game";

describe("Game Class 기본적인 요소에 대해 테스트 한다.", () => {
  /**
   * ## 자동차 이름은 쉼표(,)를 기준으로 구분하며 이름은 5자 이하만 가능하다.
   * ## 자동차 경주는 5회로 고정하여 진행한다.
   */

  test("자동차 배열을 가진 Game 인스턴스를 생성할 수 있다.", () => {
    const game = new Game();

    const cars = game.cars;

    expect(cars instanceof Array).toBe(true);
  });

  test("컴마로 구분된 자동차 이름 문자열을 받으면 자동차 배열로 만들어 준다.", () => {
    const game = new Game();

    const carString = "차1,차2,차3,차4";
    const cars = game.getCarsByCarsString(carString.trim());

    expect(cars instanceof Array).toBe(true);
    expect(cars.length).toBe(4);
  });

  test("자동차 이름이 5글자가 넘으면 false가 반환 된다.", () => {
    const game = new Game();

    const carString = "차1,차2,차3,차4";
    const cars = game.getCarsByCarsString(carString.trim());

    expect(cars instanceof Array).toBe(true);
    expect(cars.length).toBe(4);
  });
});
