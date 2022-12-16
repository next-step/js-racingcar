import { SELECTOR } from '../../src/js/constants/selector.js';
import { GAME_CONDITION } from '../../src/js/constants/condition.js';

Cypress.Commands.add('registerNamesByButton', (text) => {
  cy.get(SELECTOR.CAR_NAMES_INPUT).type(text);
  cy.get(SELECTOR.CAR_NAMES_BTN).click();
});
Cypress.Commands.add('registerCountByButton', (value) => {
  cy.get(SELECTOR.TRIAL_COUNT_INPUT).type(value);
  cy.get(SELECTOR.TRIAL_COUNT_BTN).click();
});
Cypress.Commands.add('runAllTurns', (trialCount) => {
  cy.tick(GAME_CONDITION.INTERVAL_TIME * trialCount);
});
