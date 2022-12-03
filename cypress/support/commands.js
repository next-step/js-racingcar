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

Cypress.Commands.add('getCarRaceCountForm', () => {
  cy.get('#car-race-count-form').should('be.visible');
});

Cypress.Commands.add('getCarRaceCountInput', (value) => {
  cy.get('#car-race-count-input').should('have.value', value);
});

Cypress.Commands.add('typeCarRaceCountInput', (value) => {
  cy.get('#car-race-count-input').type(value);
});

Cypress.Commands.add('clickCarRaceCountSubmitButton', () => {
  cy.get('#car-race-count-submit-button').click();
});
