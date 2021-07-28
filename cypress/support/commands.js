Cypress.Commands.add("getTextInput", () => cy.get("[data-cy=text-input]"));
Cypress.Commands.add("getTextButton", () => cy.get("[data-cy=text-button]"));
Cypress.Commands.add("getTryTimeInput", () => cy.get("[data-cy=trytime-input]"));
Cypress.Commands.add("getTryTimeButton", () => cy.get("[data-cy=trytime-button]"));
Cypress.Commands.add("windowAlertStub", (stub, message) => expect(stub.getCall(0)).to.be.calledWith(message));
