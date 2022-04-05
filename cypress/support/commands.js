import { ALERT_MESSAGES } from '../../src/constants/alertMessages.js';

Cypress.Commands.add('getCarNameInput', () => {
  cy.get('[data-cy="input-car-name"]');
});

Cypress.Commands.add('getCarNameSubmitButton', () => {
  cy.get('[data-cy="submit-car-name"]');
});

Cypress.Commands.add('alertCarNamesInput', () => {
  const alertStub = cy.stub();
  cy.on('window:alert', alertStub);

  cy.getCarNameSubmitButton()
    .click()
    .then(() => {
      expect(alertStub.getCall(0)).to.be.calledWith(ALERT_MESSAGES.INVALID_CAR_NAMES);
    });
});

Cypress.Commands.add('getInputRaceTimesSection', () => {
  cy.get('[data-cy="input-race-times-section"]');
});

Cypress.Commands.add('getRaceTimesInput', () => {
  cy.get('[data-cy="input-race-times"]');
});

Cypress.Commands.add('getRaceTimesSubmitButton', () => {
  cy.get('[data-cy="submit-race-times"]');
});

Cypress.Commands.add('alertRaceTimesInput', () => {
  const alertStub = cy.stub();
  cy.on('window:alert', alertStub);

  cy.getRaceTimesSubmitButton()
    .click()
    .then(() => {
      expect(alertStub.getCall(0)).to.be.calledWith(ALERT_MESSAGES.INVALID_RACE_TIEMS);
    });
});

Cypress.Commands.add('getCarsContainer', () => {
  cy.get('[data-cy="cars-container"]');
});

Cypress.Commands.add('enrollCorrectCarName', (carName) => {
  cy.getCarNameInput().type(carName);
  cy.getCarNameSubmitButton().click();

  cy.getCarNameInput().should('be.disabled');
  cy.getCarNameSubmitButton().should('be.disabled');
});

Cypress.Commands.add('enrollCorrectRaceTimes', (raceTimes) => {
  cy.getRaceTimesInput().type(raceTimes);
  cy.getRaceTimesSubmitButton().click();

  cy.getRaceTimesInput().should('be.disabled');
  cy.getRaceTimesSubmitButton().should('be.disabled');
});

Cypress.Commands.add('getGameResultContainer', () => {
  cy.get('[data-cy="game-result-container"]');
});

Cypress.Commands.add('getGameResultButton', () => {
  cy.get('[data-cy="game-reset-btn');
});
