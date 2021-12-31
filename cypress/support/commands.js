// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('inputCarNames', carNames => {
  cy.get('#carNames').type(carNames);
});

Cypress.Commands.add('inputTryAmount', tryAmount => {
  cy.get('#tryAmount').type(tryAmount);
});

Cypress.Commands.add('startRacing', (namesString, tryAmount) => {
  cy.inputCarNames(namesString);
  cy.inputTryAmount(tryAmount);
  cy.get('#startRacing').click();
});

