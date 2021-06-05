import {
  CAR_FORM,
  TIME_FORM,
  NAME_INPUT,
  TIME_INPUT,
} from "../constants/selectors.js";

const defaultNames = "짱구, 훈이, 유리";
const defaultTime = 3;

const names = [
  ["짱구", "훈이", "유리", "철수", "맹구"],
  ["짱구", "훈이", "유리", "철수"],
  ["짱구", "훈이", "유리"],
  ["짱구", "훈이"],
  ["짱구"],
];

export const nameDatas = names.map((data) => {
  return { name: data.join(","), length: data.length };
});

export const timeDatas = Array.from({ length: 5 }, (_, index) => index + 1);

export const setUpCarRace = (cars = defaultNames, time = defaultTime) => {
  cy.get(NAME_INPUT).type(cars);
  cy.get(CAR_FORM).submit();
  cy.get(TIME_INPUT).type(time);
  cy.get(TIME_FORM).submit();
};
