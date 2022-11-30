export const carNameFieldsetSelector = 'fieldset[name="car-name"]';
export const carNameInputSelector = 'input[name="car-name"]';
export const racingCountFieldsetSelector = 'fieldset[name="racing-count"]';
export const racingCountInputSelector = 'input[name="racing-count"]';

Cypress.Commands.add('carNameTypo', (carName) => {
 cy.get(carNameFieldsetSelector).within(() => {
  cy.get(carNameInputSelector).type(carName);
  cy.get('button').click();
 });
});
