import { Game } from "../src/Game";

describe("Game Class 기본적인 요소에 대해 테스트 한다.", () => {
  /**
   * ## 자동차 이름은 쉼표(,)를 기준으로 구분하며 이름은 5자 이하만 가능하다.
   * - 자동차 경주가 이뤄질 수 있도록 하는 게임이라는 클래스를 만든다.
   *   - 게임 클래스는 자동차의 목록을 관리할 수 있도록 자동차 배열을 가진다.
   * - 게임클래스는 게임을 진행하기 위한 유틸성 클래스이다.
   *   - 자동차들을 만드는 기능을 수행할 수 있어야 한다.
   *     - 자동차를 입력받는 기능은 없다.
   *     - 대신 자동차 문자열을 받아서 자동차이름 배열로 만들어 준다.
   *     - 만약 5자가 넘는 자동차 명이 입력됐다면 undefined.
   *     - 자동차 없어도 undefined
   *
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
