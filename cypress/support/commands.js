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

Cypress.Commands.add("isVisible", (target) => {
  cy.get(target).should("be.visible");
});

Cypress.Commands.add("isNotVisible", (target) => {
  cy.get(target).should("be.not.visible");
});

Cypress.Commands.add("submitCarNames", (names) => {
  cy.get(".car-player").type(names);
  cy.get(".btn-cyan").click();
});

Cypress.Commands.add("containCarPlayer", (player) => {
  cy.get(".car-player").contains(player);
});

Cypress.Commands.add("submitNumberOfAttempts", (attempts) => {
  cy.get(".number-of-attempts").type(attempts);
});

Cypress.Commands.add("alertMessage", (message) => {
  cy.on("window:alert", (text) => {
    expect(text).to.contain(message);
  });
});
