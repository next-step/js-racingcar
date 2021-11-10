// https://on.cypress.io/custom-commands

Cypress.Commands.add('getNameInput', () => cy.get('[data-cy="name-input"]'));
Cypress.Commands.add('getNameButton', () => cy.get('[data-cy="name-btn"]'));
Cypress.Commands.add('getCountField', () => cy.get('[data-cy="count-field"]'));
Cypress.Commands.add('getProcessSection', () => cy.get('[data-cy="process-section"]'));
Cypress.Commands.add('getResultSection', () => cy.get('[data-cy="result-section"]'));
Cypress.Commands.add('getResult', () => cy.get('[data-cy="result"]'));
Cypress.Commands.add('getCountInput', () => cy.get('[data-cy="count-input"]'));
Cypress.Commands.add('getCountButton', () => cy.get('[data-cy="count-btn"]'));
Cypress.Commands.add('getResetButton', () => cy.get('[data-cy="reset"]'));
Cypress.Commands.add('getNthCarForward', (n) =>
  cy.get(`[data-cy="car"]:nth-child(${n}) > [data-cy="forward"]`),
);

Cypress.Commands.add('shouldStubToBeCalledWith', (stub, arg) =>
  expect(stub.getCall(0)).to.be.calledWith(arg),
);
