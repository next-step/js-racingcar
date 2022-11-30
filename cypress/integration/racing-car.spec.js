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

    it("콤마를 기준으로 자동차명을 구분한다.", () => {
      // 콤마가 2개이면 자동차가 2대, 3개면 3대 등
    });
  });

  context("사용자는 몇 번 이동할지 횟수를 입력한다.", () => {
    it("최소 1 이상의 숫자를 입력해야 한다.", () => {
      expect(true).to.eq(false);
    });
    it("최대 10까지 입력할 수 있다.", () => {
      expect(true).to.eq(false);
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
