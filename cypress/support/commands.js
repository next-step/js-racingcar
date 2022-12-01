import { SELECTOR } from '../../src/js/constants/selector.js';

Cypress.Commands.add('registerNamesByButton', (text) => {
  cy.get(SELECTOR.CAR_NAMES_INPUT).type(text);
  cy.get(SELECTOR.CAR_NAMES_BTN).click();
});
