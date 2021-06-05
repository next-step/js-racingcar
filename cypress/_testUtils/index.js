import {
  CAR_FORM,
  TIME_FORM,
  NAME_INPUT,
  TIME_INPUT,
} from "../constants/selectors.js";

const defaultNames = "짱구, 훈이, 유리";
const defaultTime = 3;

export const setUpCarRace = (cars = defaultNames, time = defaultTime) => {
  cy.get(NAME_INPUT).type(cars);
  cy.get(CAR_FORM).submit();
  cy.get(TIME_INPUT).type(time);
  cy.get(TIME_FORM).submit();
};
