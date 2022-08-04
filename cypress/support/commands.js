Cypress.Commands.add('enterCarNames', (carNames) => {
  cy.get('[data-cy="input-car-name"]').type(carNames);
  cy.get('[data-cy="submit-car-name"]').click();
});

Cypress.Commands.add('enterRaceCount', (tryCount) => {
  cy.get('[data-cy="input-race-count"]').type(tryCount);
  cy.get('[data-cy="submit-race-count"]').click();
});
