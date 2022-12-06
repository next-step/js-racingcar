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
  cy.get(".input-car-name").type(names);
  cy.get(".btn-name-submit").click();
});

Cypress.Commands.add("submitNumberOfAttempts", (number) => {
  cy.get(".input-number-attempts").type(number);
  cy.get(".btn-attempts-submit").click();
});

Cypress.Commands.add("disabledCarNamesAfterSubmit", (target) => {
  cy.get(target).should("be.disabled");
});

Cypress.Commands.add("containCarPlayer", (player) => {
  cy.get(".car-player").contains(player);
});

Cypress.Commands.add("alertMessage", (message) => {
  cy.on("window:alert", (text) => {
    expect(text).to.contain(message);
  });
});

Cypress.Commands.add("renderCarPlayer", (section, player) => {
  cy.get(section).find(player).should("have.length", 4);
});
