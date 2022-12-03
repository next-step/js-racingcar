import {ALERT_MESSAGE} from "../../src/js/constants/constants.js";

const INPUT_CAR_NAMES = "EAST, WEST, SOUTH, NORTH";
const INVALID_INPUT_CAR_NAMES = "EASTTT, WESTTT, SOUTHH, NORTHH";

describe("자동차 경주 게임", () => {
  beforeEach(() => {
    cy.visit("../../index.html");
  });
  context("사용자가 자동차 게임에 참여하기 전", () => {
    it("화면에서 자동차 이름을 부여할 input창과 확인버튼이 존재한다", () => {
      cy.isVisible(".input-car-name");
      cy.isVisible(".btn-name-submit");
      cy.isNotVisible(".input-number-attempts");
    });

    it("자동차 이름은 쉼표(,)를 기준으로 구분한다", () => {
      cy.submitCarNames(INPUT_CAR_NAMES);

      cy.disabledCarNamesAfterSubmit(".input-car-name");
      cy.disabledCarNamesAfterSubmit(".btn-name-submit");
    });

    it("자동차 이름은 5자 이하이다.", () => {
      cy.submitCarNames(INVALID_INPUT_CAR_NAMES);
      cy.alertMessage(ALERT_MESSAGE.INVALID_INPUT_CAR_NAMES);
    });
  });

  context("자동차 경주 게임 시작 후", () => {
    it("주어진 횟수 동안 n대의 자동차는 전진 또는 멈출 수 있다.", () => {});

    it("전진하는 조건은 0에서 9 사이에서 random 값을 구한 후 random 값이 4 이상일 경우 전진하고, 3 이하의 값이면 멈춘다.", () => {});
  });
});
