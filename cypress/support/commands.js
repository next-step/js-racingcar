import { SELECTOR } from '../../src/js/constants/selector.js';
import { GAME_CONDITION } from '../../src/js/constants/condition.js';

Cypress.Commands.add('submitCarNames', (text) => {
  cy.get(SELECTOR.CAR_NAMES_INPUT).type(text);
  cy.get(SELECTOR.CAR_NAMES_FORM).submit();
});
Cypress.Commands.add('submitTrialCount', (value) => {
  cy.get(SELECTOR.TRIAL_COUNT_INPUT).type(value);
  cy.get(SELECTOR.TRIAL_COUNT_FORM).submit();
});
Cypress.Commands.add('runAllTurns', (trialCount) => {
  cy.tick(GAME_CONDITION.TURN_INTERVAL_TIME * trialCount);
});
Cypress.Commands.add('alertMessage', (message) => {
  cy.on('window:alert', (text) => {
    expect(text).to.contains(message);
  });
});
