import {ALERT_MESSAGE} from "../../src/js/constants/constants.js";

const INPUT_CAR_NAMES = "EAST, WEST, SOUTH, NORTH";
const NO_COMMA_INPUT_CAR_NAMES = "EAST WEST SOUTH NORTH";
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

    it("자동차 이름을 입력할 때, 자동차 이름은 쉼표(,)를 기준으로 구분한다.", () => {
      cy.isVisible(".input-car-name");
      cy.isVisible(".btn-name-submit");

      cy.submitCarNames(NO_COMMA_INPUT_CAR_NAMES);

      cy.alertMessage(ALERT_MESSAGE.INVALID_INPUT_CAR_NAMES);
    });

    it("자동차 이름을 입력할 때, 자동차 이름이 6자이상으로 입력되면 에러메세지를 띄워준다.", () => {
      cy.isVisible(".input-car-name");
      cy.isVisible(".btn-name-submit");

      cy.submitCarNames(INVALID_INPUT_CAR_NAMES);

      cy.alertMessage(ALERT_MESSAGE.INVALID_INPUT_CAR_NAMES);
    });

    it("시도횟수를 입력할 때, 레이싱 시도횟수는 1미만이라면 에러메세지를 띄운다.", () => {
      cy.submitCarNames(INPUT_CAR_NAMES);

      cy.submitNumberOfAttempts(-1);

      cy.alertMessage(ALERT_MESSAGE.INVALID_INPUT_NUMBER_OF_ATTEMPTS);
    });
  });

  context("자동차 경주 게임 시작 후", () => {
    it("시도횟수를 입력하고 확인을 누르면  자동차 이름이 화면에 표시된다", () => {
      cy.submitCarNames(INPUT_CAR_NAMES);

      cy.submitNumberOfAttempts(2);

      cy.isVisible(".car-player");
      cy.renderCarPlayer(".section-car-render", ".car-player");
    });

    it("시도횟수를 입력하고 확인을 누르면 랜덤 값에 따라서 전진 또는 스피너 아이콘이 랜더링 된다.", () => {
      cy.submitCarNames(INPUT_CAR_NAMES);

      cy.submitNumberOfAttempts(2);

      cy.isVisible(".forward-icon");
      cy.isVisible(".spinner-wrapper"); // 없을수도 있음.
    });
  });

  context("자동차 경주가 끝난 후", () => {
    it("자동차 경주가 끝난 후, 최종 우승자를 보여주는 텍스트가 보여야 한다.", () => {
      const ATTEMPTS = 2;
      cy.submitCarNames(INPUT_CAR_NAMES);
      cy.submitNumberOfAttempts(ATTEMPTS);

      cy.wait(ATTEMPTS * 1000);

      cy.isVisible(".winners");
    });

    it("게임을 다시 시작할 수 있는 리셋버튼이 보여야 한다.", () => {
      const ATTEMPTS = 2;
      cy.submitCarNames(INPUT_CAR_NAMES);
      cy.submitNumberOfAttempts(ATTEMPTS);

      cy.wait(ATTEMPTS * 1000);

      cy.isVisible(".reset");
    });

    it("리셋 버튼을 클릭했을 때 화면이 초기화 되어야 한다.", () => {
      const ATTEMPTS = 2;
      cy.submitCarNames(INPUT_CAR_NAMES);
      cy.submitNumberOfAttempts(ATTEMPTS);

      cy.pressResetBtn(".reset");

      cy.isVisible(".input-car-name");
      cy.isVisible(".btn-name-submit");
      cy.isNotVisible(".input-number-attempts");
    });
  });
});
