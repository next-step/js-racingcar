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
import { ELEMENT } from '../../src/js/constants/elements.js';

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

Cypress.Commands.add('submitCarNames', (carNames) => {
  cy.get(ELEMENT.CAR_NAME_INPUT).type(carNames);
  cy.get(ELEMENT.CAR_NAME_SUBMIT_BUTTON).click();
});

Cypress.Commands.add('submitTrial', (trialNumber) => {
  cy.get(ELEMENT.MOVE_INPUT).type(trialNumber);
  cy.get(ELEMENT.MOVE_SUBMIT_BUTTON).click();
  cy.get(ELEMENT.MOVE_SUBMIT_BUTTON).should('be.disabled');
});
