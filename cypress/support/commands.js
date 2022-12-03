Cypress.Commands.add('getCarNameForm', () => {
  cy.get('#car-name-form').should('be.visible');
});

Cypress.Commands.add('getCarNameInput', (value) => {
  cy.get('#car-name-input').should('have.value', value);
});

Cypress.Commands.add('typeCarNameInput', (value) => {
  cy.get('#car-name-input').type(value);
});

Cypress.Commands.add('clickCarNameSubmitButton', () => {
  cy.get('#car-name-submit-button').click();
});
