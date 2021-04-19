describe("racing car game", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080");
  });

  context("자동차 이름 입력 시", () => {
    it(",를 기준으로 하단에 이름이 반영된다.", () => {
      const carsName = "A, B, C, D";
      cy.get(".car-name-input").type(carsName);
      cy.get(".car-name-submit").click();

      cy.get(".car-list").should("contain.text", "A");
      cy.get(".car-list").should("contain.text", "B");
      cy.get(".car-list").should("contain.text", "C");
      cy.get(".car-list").should("contain.text", "D");
    });
  });
});
