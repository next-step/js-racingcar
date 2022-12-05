Cypress.Commands.add('getCarNameForm', () => {
  cy.get('#car-name-form').should('be.visible');
});

Cypress.Commands.add('getCarNameInput', ({ value, disabled }) => {
  if (disabled) {
    cy.get('#car-name-input').should('be.disabled');
    cy.get('#car-name-input').should('have.value', value);
    return;
  }

  cy.get('#car-name-input').should('have.value', value);
});

Cypress.Commands.add('typeCarNameInput', (value) => {
  cy.get('#car-name-input').type(value);
});

Cypress.Commands.add('getCarNameSubmitButton', ({ disabled }) => {
  cy.get('#car-name-submit-button').should(
    disabled ? 'be.disabled' : 'be.visible'
  );
});

Cypress.Commands.add('clickCarNameSubmitButton', () => {
  cy.get('#car-name-submit-button').click();
});

Cypress.Commands.add('getCarRaceCountForm', () => {
  cy.get('#car-race-count-form').should('be.visible');
});

Cypress.Commands.add('getCarRaceCountInput', ({ value, disabled }) => {
  if (disabled) {
    cy.get('#car-race-count-input').should('be.disabled');
    cy.get('#car-race-count-input').should('have.value', value);
    return;
  }

  cy.get('#car-race-count-input').should('have.value', value);
});

Cypress.Commands.add('typeCarRaceCountInput', (value) => {
  cy.get('#car-race-count-input').type(value);
});

Cypress.Commands.add('getCarRaceCountSubmitButton', ({ disabled }) => {
  cy.get('#car-race-count-submit-button').should(
    disabled ? 'be.disabled' : 'be.visible'
  );
});

Cypress.Commands.add('clickCarRaceCountSubmitButton', () => {
  cy.get('#car-race-count-submit-button').click();
});

Cypress.Commands.add('getCarNames', (carNames) => {
  carNames.forEach((carName) => {
    cy.get(`#car-${carName} .car-player`).should('have.text', carName);
  });
});

Cypress.Commands.add('getForwardIcon', (carNames) => {
  carNames.forEach((carName) => {
    cy.get(`#car-${carName} .forward-icon`).first().should('have.text', '⬇️️');
  });
});
