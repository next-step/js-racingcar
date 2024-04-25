import { describe, expect, test } from "@jest/globals";
import { Controller } from "../src/Controller";

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

  test("잘못된 입력 값 - not string", () => {
    //given
    const controller = new Controller();
    const input = 1;

    //when
    const withWrongInput = () => controller.init(input);

    //then
    expect(withWrongInput).toThrowError(new Error("잘못된 입력입니다."));
  });

  test("잘못된 입력 값 - empty string", () => {
    //given
    const controller = new Controller();
    const input = "";

    //when
    const withWrongInput = () => controller.init(input);

    //then
    expect(withWrongInput).toThrowError(new Error("잘못된 입력입니다."));
  });

  test("잘못된 입력 값 - 의미없는 쉼표", () => {
    //given
    const controller = new Controller();
    const input = "car1,,car2,car3";

    //when
    const withWrongInput = () => controller.init(input);

    //then
    expect(withWrongInput).toThrowError(new Error("잘못된 입력입니다."));
  });

  test("잘못된 입력 값 - 중복된 이름", () => {
    //given
    const controller = new Controller();
    const input = "car1,car1,car2";

    //when
    const withWrongInput = () => controller.init(input);

    //then
    expect(withWrongInput).toThrowError(new Error("잘못된 입력입니다."));
  });
});
