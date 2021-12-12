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

import { CLASS_NAME, INPUT_NAME } from "../../src/js/constants/selectors";

Cypress.Commands.add("submitCarNames", (carNamesString) => {
  cy.get(`.${CLASS_NAME.CAR_NAMES_FORM}`).then(($form) => {
    cy.wrap($form).get(`input[name="${INPUT_NAME.CAR_NAMES}"]`).type(carNamesString);
    cy.wrap($form).submit();
  });
});

Cypress.Commands.add("submitTryCount", (tryCount) => {
  cy.get(`.${CLASS_NAME.TRY_COUNT_FORM}`).then(($form) => {
    cy.wrap($form).get(`input[name="${INPUT_NAME.TRY_COUNT}"]`).type(tryCount);
    cy.wrap($form).submit();
  });
});
