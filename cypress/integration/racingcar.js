/// <reference types="cypress" />

context("RacingCar", () => {
  beforeEach(() => {
    cy.visit(Cypress.config().baseUrl);
  });
  describe("Hello world", () => {
    it("", () => {
      cy.get("#app").then(($app) => $app.get("Hello world!"));
    });
  });
});
