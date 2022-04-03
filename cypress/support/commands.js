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
