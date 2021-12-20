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

Cypress.Commands.add('initialScreen', () => {
  cy.get("race-count-form").should("not.be.visible");
  cy.get("race-course-view").should("not.be.visible");
  cy.get("race-result-view").should("not.be.visible");
})

Cypress.Commands.add('inputCarName', (name) => {
  cy.get("#inputCarNames").type(name);
  cy.get("#btnCarNames").click();
})

Cypress.Commands.add('inputCount', (count) => {
  cy.get("#inputRunCount").type(count);
  cy.get("#btnRunCount").click();
})
