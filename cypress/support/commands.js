Cypress.Commands.add("alert", ({ action, message }) => {
  const alertStub = cy.stub();

  cy.on("window:alert", alertStub);

  action().then(() => {
    expect(alertStub.getCall(0)).to.be.calledWith(message);
  });
});
