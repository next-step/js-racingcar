import RACING_GAME from "../../src/constants";

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
    let carNames = "감자, 고구마";

    beforeEach(() => {
      cy.get("#car-names-input").type(carNames);
      cy.get("#car-names-button").click();
      cy.get("#racing-count-input").type("5");
      cy.get("#racing-count-button").click();
    });

    it("자동차명이 (감자, 고구마)인 경우", () => {
      cy.get(`#car-name-감자`).should("exist");
      cy.get(`#car-name-고구마`).should("exist");
    });
    it("자동차명에 공백이 있는 경우 제거한다.", () => {
      carNames = "    감자    ,  고구마 ";
      cy.get(`#car-name-감자`).should("exist");
      cy.get(`#car-name-고구마`).should("exist");
    });
  });
});

/**
 * 1. 자동차의 이름은 5자 이하만 입력 가능하다.

 * 3. 사용자는 몇 번 이동할지 '숫자'만 입력한다.
 * 4. 시도 확인 버튼을 누르면 등록한 차량의 개수만큼 이름이 노출되고, 경주를 시작한다.
 * 4. 입력한 숫자만큼 등록한 차량이 전진하는 조건에 따라 이동한다.
 * 5. 0~9의 랜덤값을 구한 후 random 값이 4이상이면 전진, 3이하의 값이면 멈춘다.
 */
