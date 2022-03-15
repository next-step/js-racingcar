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
const { ERROR_MESSAGES, TEST_DOM } = require('../../src/js/constants.js');
const { test$ } = require('../../src/js/utils/utils.js');

Cypress.Commands.add('typeCarNamesAndSubmit', (carNames) => {
  if (carNames.length > 0) cy.get(test$(TEST_DOM.CAR_NAMES_INPUT)).type(carNames);
  cy.get(test$(TEST_DOM.CAR_NAMES_FORM)).submit();
  cy.get(test$(TEST_DOM.CAR_NAMES_INPUT)).clear();
});

Cypress.Commands.add('typeTryCountsAndSubmit', (tryCounts) => {
  if (tryCounts.length > 0) cy.get(test$(TEST_DOM.TRY_COUNTS_INPUT)).type(tryCounts);
  cy.get(test$(TEST_DOM.TRY_COUNTS_FORM)).submit();
  cy.get(test$(TEST_DOM.TRY_COUNTS_INPUT)).clear();
});
