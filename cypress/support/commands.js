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

Cypress.Commands.add('inputCarName', (nameList) => {
    cy.get('#input-car-name').type(nameList);
    cy.get('#btn-name').click();
});

Cypress.Commands.add('inputTryNumber', (tryNumber) => {
    cy.get('#input-number').type(tryNumber);
    cy.get('#btn-number').click();
});

Cypress.Commands.add('startRace', (nameList, tryNumber) => {
    cy.get('#input-car-name').type(nameList);
    cy.get('#btn-name').click();

    cy.get('#input-number').type(tryNumber);
    cy.get('#btn-number').click();

    cy.get('#start').click();
});
