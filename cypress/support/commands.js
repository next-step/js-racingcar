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

// Cypress.Commands.add('resetForm', () => {
//   cy.get('.js-car-name').clear();
//   cy.get('.js-play-time-container')
// });

Cypress.Commands.add('submitCarName', (name) => {
  cy.get('.js-car-name').type(name);
  cy.get('button[name="carName"]').click();
});

Cypress.Commands.add('submitPlayTimes', (times) => {
  cy.get('.js-play-time-container').type(times);
  cy.get('button[name="playTimes"]').click();
});

Cypress.Commands.add('getCarName', () => {
  cy.get('.js-car-name').invoke('val');
});
