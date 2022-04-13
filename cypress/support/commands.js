Cypress.Commands.add('$', selector => {
  return cy.get(selector);
});

Cypress.Commands.add('inputCarNames', names => {
  cy.get('[name="car-names-input"]').type(names);
  cy.get('[name="car-names-confirm-button"]').click();
});

Cypress.Commands.add('inputGameTryCount', count => {
  cy.get('[name="game-try-count-input"]').type(count);
  cy.get('[name="game-try-count-confirm-button"]').click();
});
