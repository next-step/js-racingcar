Cypress.Commands.add('submitCarName', (text) => {
  cy.get('#form-car-name input').type(text);
  cy.get('#form-car-name').submit();
});
