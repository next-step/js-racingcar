/// <reference types="cypress" />
import { CAR_GENERATE_BUTTON, CAR_NAME_INPUT } from "../../src/js/utils/selector.js";

Cypress.Commands.add("generateCars", (cars) => {
  cy.get(CAR_NAME_INPUT).type(cars);
  cy.get(CAR_GENERATE_BUTTON).click();
});

Cypress.Commands.add("checkAlertMessage", (alertMessage) => {
  cy.on("window:alert", (text) => {
    expect(text).equal(alertMessage);
  });
});
