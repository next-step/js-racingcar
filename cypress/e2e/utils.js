import { SELECTORS } from "/src/constants.js";

export const shouldShowAlert = (typeVal, selector, err) => {
  cy.on("window:alert", (alertMessage) => {
    expect(alertMessage).to.eq(err);
  });
  if (typeVal) cy.get(selector).type(typeVal);
  cy.get(SELECTORS.CAR_NAME_FORM).submit();
};

export const submitForm = (selector, typeVal) => {
  if (typeVal) cy.get(selector).type(typeVal);
  cy.get(SELECTORS.CAR_NAME_FORM).submit();
};
