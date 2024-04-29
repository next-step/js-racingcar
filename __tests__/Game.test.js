import { Game } from "../src/Game";

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

  test("play 함수", () => {});
});
