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
});
