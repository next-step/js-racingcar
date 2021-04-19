import { ERROR_MESSAGE } from "../../src/js/utils/constnats";

describe("racing car game", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080");
  });

  context("자동차 이름 입력 시", () => {
    it(",를 기준으로 하단에 이름이 반영된다.", () => {
      const carNames = "A, B, C, D";

      cy.get(".car-name-input").type(carNames);
      cy.get(".car-name-submit").click();

      cy.get(".car-list")
        .should("contain.text", "A")
        .and("contain.text", "B")
        .and("contain.text", "C")
        .and("contain.text", "D");
    });

    it("하나 이상의 이름이 1자 미만이면 경고창이 뜬다.", () => {
      const carNames = "A, , C, D";

      cy.get(".car-name-input").type(carNames);
      cy.get(".car-name-submit").click();

      cy.on("window:alert", (error) =>
        expect(error).to.contains(ERROR_MESSAGE.NAME_LENGTH)
      );
      cy.get(".car-list")
        .should("not.contain.text", "A")
        .and("not.contain.text", "C")
        .and("not.contain.text", "D");
    });

    it("하나 이상의 이름이 5자를 초과하면 경고창이 뜬다.", () => {
      const carNames = "ABCDEF, B, C, D";

      cy.get(".car-name-input").type(carNames);
      cy.get(".car-name-submit").click();

      cy.on("window:alert", (error) =>
        expect(error).to.contains(ERROR_MESSAGE.NAME_LENGTH)
      );
      cy.get(".car-list")
        .should("not.contain.text", "ABCDEF")
        .and("not.contain.text", "B")
        .and("not.contain.text", "C")
        .and("not.contain.text", "D");
    });
  });
});
