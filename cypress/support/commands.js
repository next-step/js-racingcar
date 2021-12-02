// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('submitNames', (text) => {
  cy.get('#carNames').clear();
  cy.get('#carNames').type(text);
  cy.get('#carNameFormSection').submit();
});

Cypress.Commands.add('submitTryCount', (number) => {
  cy.get('#tryCount').clear();
  cy.get('#tryCount').type(number);
  cy.get('#tryCountFormSection').submit();
});

Cypress.Commands.add('checkCss', (selector, style, value, type = true) => {
  const haveCss = type ? 'have.css' : 'have.not.css';
  cy.get(selector).should(haveCss, style, value);
});
