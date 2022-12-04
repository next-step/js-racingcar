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

Cypress.Commands.add('setName', name => {
  cy.get('.car-name-input').type(name, { force: true });
  cy.get('.car-name-submit-btn').click({ force: true });
});

Cypress.Commands.add('setTrialCount', count => {
  cy.get('.trial-input').type(count, { force: true });
  cy.get('.trial-submit-btn').click({ force: true });
});

Cypress.Commands.add('isAlert', message => {
  cy.on('window:alert', str => {
    expect(str).to.equal(message);
  });
});
