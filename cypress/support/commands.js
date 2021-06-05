Cypress.Commands.add('inputCarNames', (carNames) => {
  cy.get('#car-name-input').type(carNames);
  return cy.get('#car-name-btn').click();
});
