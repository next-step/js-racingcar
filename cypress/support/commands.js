Cypress.Commands.add("getCarInput", () => cy.get("[data-cy=car-input]"));
Cypress.Commands.add("getCarButton", () => cy.get("[data-cy=car-button]"));
Cypress.Commands.add("getTryTimeInput", () => cy.get("[data-cy=trytime-input]"));
Cypress.Commands.add("getTryTimeButton", () => cy.get("[data-cy=trytime-button]"));
Cypress.Commands.add("windowAlertStub", (stub, message) => expect(stub.getCall(0)).to.be.calledWith(message));
