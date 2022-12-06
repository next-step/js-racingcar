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

    it("레이싱 시도횟수는 1이상이어야 한다.", () => {
      cy.submitCarNames(INPUT_CAR_NAMES);
      cy.submitNumberOfAttempts(-1);
      cy.alertMessage(ALERT_MESSAGE.INVALID_INPUT_NUMBER_OF_ATTEMPTS);
    });
  });

  context("자동차 경주 게임 시작 후", () => {
    it("시도횟수를 입력하고 확인을 누른 뒤 자동차 이름이 화면에 표시된다", () => {
      cy.submitCarNames(INPUT_CAR_NAMES);
      cy.submitNumberOfAttempts(2);
      cy.isVisible(".car-player");
      cy.renderCarPlayer(".section-car-render", ".car-player");
    });

    it("멈춘차량은 스피너가 표시된다.", () => {
      cy.submitCarNames(INPUT_CAR_NAMES);
      cy.submitNumberOfAttempts(2);

      cy.isVisible(".forward-icon");
    });

    it("전진하는 차량은 화살표가 표시된다.", () => {
      cy.submitCarNames(INPUT_CAR_NAMES);
      cy.submitNumberOfAttempts(2);

      cy.isVisible(".spinner-wrapper");
    });
  });
});
