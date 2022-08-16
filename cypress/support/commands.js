import { SELECTORS } from "/src/utils/constants/selectors.js";

Cypress.Commands.add("shouldShowAlert", (typeVal, selector, err) => {
  cy.on("window:alert", (alertMessage) => {
    expect(alertMessage).to.eq(err);
  });
  if (typeVal) cy.get(selector).type(typeVal);
  cy.get(SELECTORS.CAR_NAME_FORM).submit();
});

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
