Cypress.Commands.add('inputCarNames', (carNames) => {
  cy.get('#car-name-input').type(carNames);
  return cy.get('#car-name-btn').click();
});

Cypress.Commands.add('inputCarCount', (count) => {
  cy.get('#try-count-input').type(count);
  return cy.get('#try-count-btn').click();
});
