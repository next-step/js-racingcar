import { CYPRESS_TEST, CAR_INPUT_ERR_MESSAGE } from "../../src/js/constants.js";

before(() => {
  cy.visit("http://localhost:5500");
});

describe("js-racingcar", () => {
  beforeEach(() => {});

  context("자동차 경주 게임 정상 시나리오", () => {
    it("자동차 이름을 입력하면 시도 횟수 입력 필드가 나타난다.", () => {
      cy.get("[name=cars-name-input]").type(CYPRESS_TEST.CARS_NAME);
      cy.get(".cars-name-btn").click();
      cy.get("[name=try-count-input]").should("be.visible");
    });

    it("시도 횟수 입력 필드하면 레이싱 결과가 나타난다", () => {
      cy.get("[name=try-count-input]").type(CYPRESS_TEST.TRY_COUNT);
      cy.get(".try-count-btn").click();
      cy.get(".car-player").should("be.visible");
      setTimeout(() => {
        cy.get(".race-result").should("be.visible");
      }, CYPRESS_TEST.TRY_COUNT * 1000);
      cy.reload();
    });
  });

  context("자동차 경주 게임 자동차 이름 입력 오류 시나리오", () => {
    it("잘못된 형태로 자동차 이름을 입력하면 오류 메세지가 나타난다", () => {
      cy.get("[name=cars-name-input]").type(CYPRESS_TEST.WRONG_CARS_NAME);
      cy.get(".cars-name-btn").click();
      cy.on("window:confirm", () => {
        expect().to.equal(CAR_INPUT_ERR_MESSAGE);
      });
    });
  });
});
