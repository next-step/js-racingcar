export const carNameFieldsetSelector = 'fieldset[name="carName"]';
export const carNameInputSelector = 'input[name="carName"]';
export const racingCountFieldsetSelector = 'fieldset[name="racingCount"]';
export const racingCountInputSelector = 'input[name="racingCount"]';

Cypress.Commands.add('carNameTypo', (carName) => {
 cy.get(carNameFieldset).within(() => {
  cy.get(carNameInput).type(carName);
  cy.get('button').click();
 });
});
