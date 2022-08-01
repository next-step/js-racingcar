Cypress.Commands.add('submitCarName', (text) => {
  cy.get('#form-car-name input').type(text);
  cy.get('#form-car-name').submit();
});

Cypress.Commands.add('submitTryCount', (text) => {
  cy.get('#form-try-count input').type(text);
  cy.get('#form-try-count').submit();
});
