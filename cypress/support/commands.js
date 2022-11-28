import { SELECTOR } from '../constants/selector.js';

Cypress.Commands.add('getByDataset', (dataset) => cy.get(`[data-cy="${dataset}"]`));

Cypress.Commands.add('typeCarName', (carName) => {
  cy.getByDataset(SELECTOR.CAR_NAME_INPUT).type(carName);
  cy.getByDataset(SELECTOR.CAR_NAME_FORM).submit();
});

Cypress.Commands.add('typeCarAttemptsCount', (count) => {
  cy.getByDataset(SELECTOR.CAR_ATTEMPTS_COUNT_INPUT).type(count);
  cy.getByDataset(SELECTOR.CAR_ATTEMPTS_COUNT_FORM).submit();
});

Cypress.Commands.add('startRacingGame', (carName, count) => {
  cy.typeCarName(carName);
  cy.typeCarAttemptsCount(count);
});
