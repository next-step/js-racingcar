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
Cypress.Commands.add('typeCarNames', (carNamesText) => {
    cy.get('[placeholder="자동차 이름"]').type(carNamesText);
    return cy.get('[data-form="carNamesForm"]').submit();
});

Cypress.Commands.add('typeNumberOfTry', (numberOfTry) => {
    cy.get('[placeholder="시도 횟수"]').type(numberOfTry);
    return cy.get('[data-form="numberOfTryForm"]').submit();
});
