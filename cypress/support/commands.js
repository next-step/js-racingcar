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
// Cypress.Commands.add('inputCarNames', (carNames) => {
//   cy.get('#car-name-input').type(carNames);
// });

Cypress.Commands.add('isVisible', (target) => {
  cy.get(target).should('be.visible');
});

Cypress.Commands.add('isNotVisible', (target) => {
  cy.get(target).should('not.be.visible');
});

Cypress.Commands.add('isContainsPlayer', (player) => {
  cy.get('.car-player').contains(player);
});

Cypress.Commands.add('submitCarNames', (carNames) => {
  cy.get('#car-name-input').type(carNames);
  cy.get('#car-name-submit').click();
});

Cypress.Commands.add('submitAttemptCount', (attemptCount) => {
  cy.get('#attempt-count-input').type(attemptCount);
  cy.get('#attempt-count-submit').click();
});
