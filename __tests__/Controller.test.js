import { describe, expect, test } from "@jest/globals";
import { Controller } from "../src/Controller";
import { ROUND_TIMES } from "../src/const/RacingConfig";
import { Round } from "../src/domain/Round";

describe("컨트롤러 테스트", () => {
  test("사용자로부터 자동차 이름을 입력받는다.", () => {
    //given
    const controller = new Controller();
    const input = "car1,car2,car3";
    controller.init(input);

    //when
    const carNames = controller.carNames;

    //then
    expect(carNames).toEqual(input.split(","));
  });

  test(`라운드를 ${ROUND_TIMES}회 진행한다.`, () => {
    //given
    const controller = new Controller();
    const input = "car1,car2,car3";
    controller.init(input);

    //when
    controller.play(ROUND_TIMES);
    const rounds = controller.rounds;

    //then
    expect(rounds.length).toBe(ROUND_TIMES);
    rounds.forEach((e) => expect(e).toBeInstanceOf(Round));
  });

  test("우승자를 출력한다.", () => {
    //given
    const controller = new Controller();
    const input = "car1,car2,car3";
    controller.init(input);
    controller.play(ROUND_TIMES);

    //when
    const winners = controller.winners;

    //then
    winners.forEach((e) => expect(input).toContain(e));
  });
});
