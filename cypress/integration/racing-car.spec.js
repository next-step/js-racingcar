import RACING_GAME from "../../src/constants.js";

const registerCarNames = (carNames) => {
  cy.get("#car-names-input").type(carNames);
  cy.get("#car-names-button").click();
};

const registerRacingCount = (count) => {
  cy.get("#racing-count-input").type(count.toString());
  cy.get("#racing-count-button").click();
};

describe("레이싱 게임", () => {
  beforeEach(() => {
    cy.visit("../../index.html");
  });

  context("5자 이하의 자동차 이름을 콤마로 구분하여 입력한다.", () => {
    it("자동차 명은 1자 이상 5자 이하이다.", () => {
      cy.get("#car-names-input").type("{backspace}");
      cy.alertMessage({
        selector: "#car-names-button",
        message: RACING_GAME.MESSAGES.CAR_NAMES_MISMATCH,
      });

      cy.get("#car-names-input").type("123456");
      cy.alertMessage({
        selector: "#car-names-button",
        message: RACING_GAME.MESSAGES.CAR_NAMES_MISMATCH,
      });
    });
    it("특이 케이스 테스트", () => {
      cy.get("#car-names-input").type(",12,23");
      cy.alertMessage({
        selector: "#car-names-button",
        message: RACING_GAME.MESSAGES.CAR_NAMES_MISMATCH,
      });

      cy.get("#car-names-input").type("12,23,");
      cy.alertMessage({
        selector: "#car-names-button",
        message: RACING_GAME.MESSAGES.CAR_NAMES_MISMATCH,
      });

      cy.get("#car-names-input").type(",,");
      cy.alertMessage({
        selector: "#car-names-button",
        message: RACING_GAME.MESSAGES.CAR_NAMES_MISMATCH,
      });
    });
  });

  context("사용자는 몇 번 이동할지 횟수를 입력한다.", () => {
    beforeEach(() => {
      cy.get("#car-names-input").type("123");
      cy.get("#car-names-button").click();
    });

    it("최소 1 이상의 숫자를 입력해야 한다.", () => {
      cy.get("#racing-count-input").type("{backspace}");
      cy.alertMessage({
        selector: "#racing-count-button",
        message: RACING_GAME.MESSAGES.RACING_COUNT_MISMATCH,
      });

      cy.get("#racing-count-input").type("0");
      cy.alertMessage({
        selector: "#racing-count-button",
        message: RACING_GAME.MESSAGES.RACING_COUNT_MISMATCH,
      });
    });
    it("최대 10까지 입력할 수 있다.", () => {
      cy.get("#racing-count-input").type("11");
      cy.alertMessage({
        selector: "#racing-count-button",
        message: RACING_GAME.MESSAGES.RACING_COUNT_MISMATCH,
      });
    });
  });

  context("자동차를 등록하면 등록한 자동차명이 노출된다.", () => {
    it("자동차명이 (감자, 고구마)인 경우", () => {
      const carNames = "감자, 고구마";
      registerCarNames(carNames);
      registerRacingCount(5);

      cy.get(`#car-name-감자`).should("exist");
      cy.get(`#car-name-고구마`).should("exist");
    });
    it("자동차명에 공백이 있는 경우 제거한다.", () => {
      const carNames = "    감자    ,  고구마 ";
      registerCarNames(carNames);
      registerRacingCount(5);

      cy.get(`#car-name-감자`).should("exist");
      cy.get(`#car-name-고구마`).should("exist");
    });
  });
});
