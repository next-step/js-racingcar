export const carNameFieldset = 'fieldset[name="carName"]';
export const carNameInput = 'input[name="carName"]';
export const racingCountFieldset = 'fieldset[name="racingCount"]';
export const racingCountInput = 'input[name="racingCount"]';

Cypress.Commands.add('carNameTypo', (carName) => {
 cy.get(carNameFieldset).within(() => {
  cy.get(carNameInput).type(carName);
  cy.get('button').click();
 });
});
