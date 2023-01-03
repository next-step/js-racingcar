import {
  $ATTEMPT_COUNT_INPUT_SELECTOR,
  $CAR_NAME_INPUT_SELECTOR,
} from "./constant.js";

Cypress.Commands.add("alert", ({ action, message }) => {
  const alertStub = cy.stub();

  cy.on("window:alert", alertStub);

  action().then(() => {
    expect(alertStub.getCall(0)).to.be.calledWith(message);
  });
});

Cypress.Commands.add("enteredRacingOption", ({ carNames, attemptCount }) => {
  cy.get($CAR_NAME_INPUT_SELECTOR).type(`${carNames}{enter}`);
  cy.get($ATTEMPT_COUNT_INPUT_SELECTOR).type(`${attemptCount}{enter}`);
});
