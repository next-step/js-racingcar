Cypress.Commands.add('$', selector => {
  return cy.get(selector);
});

Cypress.Commands.add('inputCarNames', names => {
  cy.get('[data-props="car-names-input"]').type(names);
  cy.get('[data-props="car-names-confirm-button"]').click();
});

Cypress.Commands.add('inputGameTryCount', count => {
  cy.get('[data-props="game-try-count-input"]').type(count);
  cy.get('[data-props="game-try-count-confirm-button"]').click();
});
