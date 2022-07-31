Cypress.Commands.add('getCarNameInput', () => {
  cy.get('input[name="car-name-input"]');
});
Cypress.Commands.add('getCarNameFieldset', () => {
  cy.get('#car-name');
});
Cypress.Commands.add('getCarTryNumberSection', () => {
  cy.get('#car-try-section');
});
Cypress.Commands.add('getCarTryNumberFieldset', () => {
  cy.get('#car-try-number');
});
Cypress.Commands.add('getCarTryNumberInput', () => {
  cy.get('input[name="car-try-number-input"]');
});
Cypress.Commands.add('getCarPlayer', () => {
  cy.get('.car-player');
});
Cypress.Commands.add('getGameSeciton', () => {
  cy.get('#game');
});

Cypress.Commands.add('setEmptyStirngToInput', (name, formSelector) => {
  const getElement = formSelector === '#car-name-form' ? cy.getCarNameInput() : cy.getCarTryNumberInput();
  getElement
    .clear()
    .then((e) => {
      if (name !== '') cy.wrap(e).type(name).get(formSelector).submit();
    })
    .get(formSelector)
    .submit();
});

Cypress.Commands.add('submitCarNameForm', (name) => {
  cy.getCarNameInput().type(name, { force: true }).get('#car-name-form').submit();
});

Cypress.Commands.add('submitCarTryNumberForm', (name) => {
  cy.getCarTryNumberInput().type(name, { force: true }).get('#car-try-number-form').submit();
});

Cypress.Commands.add('onOccurAlert', (text) => {
  cy.on('window:alert', (alert) => expect(alert).to.eq(text));
});
