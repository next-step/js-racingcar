import { SELECTOR } from '../../src/js/constants';

Cypress.Commands.add('carNameTypo', (carName) => {
 cy.get(SELECTOR.FIELDSET.CAR_NAME).within(() => {
  cy.get(SELECTOR.INPUT.CAR_NAME).type(carName);
  cy.get('button').click();
 });
});
