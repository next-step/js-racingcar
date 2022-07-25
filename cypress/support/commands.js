Cypress.Commands.add('isVisible', (selector) => {
  cy.get(selector).should('be.visible')
});

Cypress.Commands.add('isDisplayNone', (selector) => {
  cy.get(selector).should('have.css', 'display', 'none')
});

Cypress.Commands.add('fillAndClickInputValue', (selector, value) => {
  cy.get(selector).type(value);
  cy.get(`${selector} + button`).click();
});

Cypress.Commands.add('checkAlertMessage', (selector, message) => {
  const alertStub = cy.stub();
  cy.on('window:alert', alertStub);

  cy.get(selector).click().then(() => {
    expect(alertStub.getCall(0)).to.be.calledWith(
      message
    );
  })
});