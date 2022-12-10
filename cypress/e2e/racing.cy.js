import {ALERT_MESSAGE} from "../../src/js/constants/constants.js";
import {startRacingCar} from "../../src/js/controller.js";
import {Car, getCarClassList} from "../../src/js/model/model.js";
import {DOM} from "../../src/js/constants/dom.js";

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
      // given
      cy.isVisible(".input-car-name");
      cy.isVisible(".btn-name-submit");

      // when
      cy.submitCarNames(NO_COMMA_INPUT_CAR_NAMES);

      // then
      cy.alertMessage(ALERT_MESSAGE.INVALID_INPUT_CAR_NAMES);
    });

    it("자동차 이름을 입력할 때, 자동차 이름이 6자이상으로 입력되면 에러메세지를 띄워준다.", () => {
      // given
      cy.isVisible(".input-car-name");
      cy.isVisible(".btn-name-submit");

      // when
      cy.submitCarNames(INVALID_INPUT_CAR_NAMES); //

      // then
      cy.alertMessage(ALERT_MESSAGE.INVALID_INPUT_CAR_NAMES);
    });

    it("시도횟수를 입력할 때, 레이싱 시도횟수는 1미만이라면 에러메세지를 띄운다.", () => {
      // given
      cy.submitCarNames(INPUT_CAR_NAMES);
      cy.isVisible(".input-number-attempts");
      cy.isVisible(".btn-attempts-submit");

      // when
      cy.submitNumberOfAttempts(-1);

      // then
      cy.alertMessage(ALERT_MESSAGE.INVALID_INPUT_NUMBER_OF_ATTEMPTS);
    });
  });

  context("자동차 경주 게임 시작 후", () => {
    it("시도횟수를 입력하고 확인을 누르면  자동차 이름이 화면에 표시된다", () => {
      // given
      cy.submitCarNames(INPUT_CAR_NAMES);

      // when
      cy.submitNumberOfAttempts(2);

      // then
      cy.isVisible(".car-player");
      cy.renderCarPlayer(".section-car-render", ".car-player");
    });

    it("자동차 경주를 시작한 후, 전진하지 못한 차량은 스피너가 표시된다.", () => {
      // given
      cy.submitCarNames(INPUT_CAR_NAMES);
      cy.submitNumberOfAttempts(2);

      // when

      // then
      cy.isVisible(".forward-icon");
    });

    it("자동차 경주를 시작한 후, 전진하는 차량은 화살표가 표시된다.", () => {
      // given
      cy.submitCarNames(INPUT_CAR_NAMES);
      cy.submitNumberOfAttempts(2);

      // when

      // then
      cy.isVisible(".spinner-wrapper");
    });
  });
});
