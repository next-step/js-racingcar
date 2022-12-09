import { SELECTOR } from '../../src/js/constants/selector.js';

Cypress.Commands.add('registerNamesByButton', (text) => {
  cy.get(SELECTOR.CAR_NAMES_INPUT).type(text);
  cy.get(SELECTOR.CAR_NAMES_BTN).click();
});
Cypress.Commands.add('registerCountByButton', (value) => {
  cy.get(SELECTOR.TRIAL_COUNT_INPUT).type(value);
  cy.get(SELECTOR.TRIAL_COUNT_BTN).click();
});
