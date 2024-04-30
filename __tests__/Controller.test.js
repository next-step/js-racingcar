import { describe, expect, test } from "@jest/globals";
import { Controller } from "../src/Controller";
import { Round } from "../src/domain/Round";

describe("컨트롤러 테스트", () => {
  test("사용자로부터 자동차 이름을 입력받는다.", () => {
    //given
    const controller = new Controller();
    const input = "car1,car2,car3";
    controller.init(input);

    //when
    const carCount = controller.baseRound.cars.length;

    //then
    expect(carCount).toEqual(input.split(",").length);
  });

  test(`입력 받은 횟수만큼 라운드를 진행한다.`, () => {
    //given
    const controller = new Controller();
    const carNames = "car1,car2,car3";

    controller.init(carNames);

    const roundTimes = 6;

    //when
    controller.play(roundTimes);
    const rounds = controller.rounds;

    //then
    expect(rounds.length).toBe(roundTimes);
    rounds.forEach((e) => expect(e).toBeInstanceOf(Round));
  });

  test("입력 받은 라운드 횟수가 0이하면 에러를 발생한다.", () => {
    //given
    const controller = new Controller();
    const carNames = "car1,car2,car3";
    controller.init(carNames);

    //when
    const roundTimes = 0;
    const whenRoundTimesZero = () => controller.play(roundTimes);

    //then
    expect(whenRoundTimesZero).toThrowError();
  });

  test("입력 받은 라운드 횟수가 정수가 아니면 에러를 발생한다.", () => {
    //given
    const controller = new Controller();
    const carNames = "car1,car2,car3";
    controller.init(carNames);

    //when
    const roundTimes = 3.14;
    const whenRoundTimesNotInteger = () => controller.play(roundTimes);

    //then
    expect(whenRoundTimesNotInteger).toThrowError();
  });

  test("우승자를 출력한다.", () => {
    //given
    const controller = new Controller();
    const input = "car1,car2,car3";
    controller.init(input);
    controller.play(5);

    //when
    const winners = controller.winners;

    //then
    winners.forEach((e) => expect(input).toContain(e));
  });
});
