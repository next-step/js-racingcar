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

/**
 * @params {string[]} carNames
 * @params {number} trailNumber
 */

const $element = {
  nameSubmitButton: '.name-submit-button',
  carNameInput: '.name-input',
  moveExplanation: '.move-explanation',
  movesInput: '.move-input',
  moveSubmitButton: '.move-submit-button',
  carPlayer: '.car-player',
  spinner: '.spinner',
  forwardIcon: '.forward-icon',
};

Cypress.Commands.add('startRace', (carNames, trialNumber) => {
  cy.get($element.carNameInput).type(carNames.join(','));
  cy.get($element.nameSubmitButton).click();
  cy.get($element.movesInput).type(trialNumber);
  cy.get($element.moveSubmitButton).click();
  cy.get($element.carPlayer).each((eachElement, index) => {
    cy.get(eachElement).should('have.text', carNames[index]);
  });
  // cy.get($element.spinner).should(
  //   'have.length',
  //   carNames.length
  // );
});
