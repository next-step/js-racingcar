Cypress.Commands.add("getCarInput", () => cy.get("[data-cy=car-input]"));
Cypress.Commands.add("getCarButton", () => cy.get("[data-cy=car-button]"));
Cypress.Commands.add("getCarField", () => cy.get("[data-cy=car-field]"));
Cypress.Commands.add("getTryTimeInput", () => cy.get("[data-cy=trytime-input]"));
Cypress.Commands.add("getTryTimeButton", () => cy.get("[data-cy=trytime-button]"));
Cypress.Commands.add("getTryField", () => cy.get("[data-cy=try-field]"));
Cypress.Commands.add("getCarContainer", () => cy.get("[data-cy=car-container]"));
Cypress.Commands.add("getNthCarStatus", (n, forward) =>
  cy.get("[data-cy=car-container]").eq(n).find(`[data-cy=${forward}]`)
);
Cypress.Commands.add("getWinnerSection", () => cy.get("[data-cy=winner-section]"));
Cypress.Commands.add("getWinner", () => cy.get("[data-cy=winner]"));
Cypress.Commands.add("getResetButton", () => cy.get("[data-cy=reset-button]"));

Cypress.Commands.add("windowAlertStub", (stub, message) => expect(stub.getCall(0)).to.be.calledWith(message));
Cypress.Commands.add("mockMathRandom", (values) => {
  const mockMathRandom = (_values) => {
    const mockValues = _values.map((value) => value / 9);
    let i = -1;
    return () => {
      i += 1;
      return mockValues[i % mockValues.length];
    };
  };
  cy.window().then((window) => {
    window.Math.random = mockMathRandom(values);
  });
});
