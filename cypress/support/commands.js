import { SELECTOR } from '../../src/js/constants';

Cypress.Commands.add('carNameTypo', (carName) => {
 cy.get(SELECTOR.FIELDSET.CAR_NAME).within(() => {
  cy.get('input').type(carName);
  cy.get('button').click();
 });
});

Cypress.Commands.add('tryCountTypo', (tryCount) => {
 cy.get(SELECTOR.FIELDSET.RACING_COUNT).within(() => {
  cy.get('input').type(tryCount);
  cy.get('button').click();
 });
});
