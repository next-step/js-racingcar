/// <reference types="cypress" />
import {
  CAR_CONTAINER,
  CAR_GENERATE_BUTTON,
  CAR_NAME_INPUT,
  ROUNDS_INPUT,
  ROUNDS_SUBMIT_BUTTON,
} from "../../src/js/utils/selector";
import { CAR_NAME_SEPARATOR } from "../../src/js/utils/constant";

import { CAR_NAMES } from "../fixtures/carNames";

Cypress.Commands.add("generateCars", (cars) => {
  cy.get(CAR_NAME_INPUT).type(cars);
  cy.get(CAR_GENERATE_BUTTON).click();
});

Cypress.Commands.add("checkAlertMessage", (alertMessage) => {
  cy.on("window:alert", (text) => {
    expect(text).equal(alertMessage);
  });
});

Cypress.Commands.add("setRounds", (rounds) => {
  cy.generateCars(CAR_NAMES);
  cy.get(ROUNDS_INPUT).type(rounds);
  cy.get(ROUNDS_SUBMIT_BUTTON).click();
});

Cypress.Commands.add("checkIsCarsReady", (carNames = CAR_NAMES) => {
  cy.get(CAR_CONTAINER).children().should("have.length", carNames.split(CAR_NAME_SEPARATOR).length);
});

Cypress.Commands.add("checkHandleInvalidRounds", () => {
  cy.get(ROUNDS_INPUT).should("be.empty");
  cy.get(CAR_CONTAINER).children().should("have.length", 0);
  cy.get(ROUNDS_INPUT).should("be.focused");
});
