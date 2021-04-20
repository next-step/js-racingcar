import { ERROR_MESSAGE } from "../../src/js/utils/constnats";

describe("racing car game", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080");
  });

  const inputCarNames = (carNames) => {
    cy.get(".car-name-input").type(carNames);
    cy.get(".car-name-submit").click();
  };

  const inputRacingTimes = (racingTimes) => {
    cy.get(".racing-times-input").type(racingTimes);
    cy.get(".racing-times-submit").click();
  };

  context("자동차 이름 입력 시", () => {
    it(",를 기준으로 하단에 이름이 반영된다.", () => {
      inputCarNames("A, B, C, D");

      cy.get(".car-list")
        .should("contain.text", "A")
        .and("contain.text", "B")
        .and("contain.text", "C")
        .and("contain.text", "D");
    });

    it("하나 이상의 이름이 1자 미만이면 경고창이 뜬다.", () => {
      inputCarNames("A, , C, D");

      cy.on("window:alert", (error) =>
        expect(error).to.contains(ERROR_MESSAGE.NAME_LENGTH)
      );
      cy.get(".car-list")
        .should("not.contain.text", "A")
        .and("not.contain.text", "C")
        .and("not.contain.text", "D");
    });

    it("하나 이상의 이름이 5자를 초과하면 경고창이 뜬다.", () => {
      inputCarNames("ABCDEF, B, C, D");

      cy.on("window:alert", (error) =>
        expect(error).to.contains(ERROR_MESSAGE.NAME_LENGTH)
      );
      cy.get(".car-list")
        .should("not.contain.text", "ABCDEF")
        .and("not.contain.text", "B")
        .and("not.contain.text", "C")
        .and("not.contain.text", "D");
    });

    it("횟수 입력 전까지는 로딩이미지가 뜨지 않는다.", () => {
      inputCarNames("A,B,C,D");

      cy.get(".loading-spinner").not(".hidden").should("not.exist");
    });
  });

  context("횟수 입력 시", () => {
    it("자동차 수 만큼의 로딩이미지가 표시된다.", () => {
      inputCarNames("A,B,C,D");
      inputRacingTimes(1);

      cy.get(".loading-spinner").not(".hidden").should("have.length", 4);
    });

    it("1 이하의 수를 입력하면 경고창이 뜬다.", () => {
      inputCarNames("A,B,C,D");
      inputRacingTimes(-1);

      cy.on("window:alert", (error) =>
        expect(error).to.contains(ERROR_MESSAGE.RACING_TIMES)
      );
      cy.get(".loading-spinner").not(".hidden").should("not.exist");
    });
  });
});
