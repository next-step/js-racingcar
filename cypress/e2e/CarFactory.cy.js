/// <reference types="cypress" />
import { ROUND_COUNT_FIELDSET } from "../../src/js/utils/selector";
import { CAR_FACTORY_ERROR_MESSAGES } from "../../src/js/utils/errorMessage";
import { CAR_NAMES, INVALID_CAR_NAMES, SINGLE_CAR_NAME } from "../fixtures/carNames";

beforeEach(() => {
  cy.visit("http://localhost:5500");
});

describe("generate cars", () => {
  it("정상적으로 차량 생성", () => {
    cy.generateCars(CAR_NAMES);
    cy.get(ROUND_COUNT_FIELDSET).should("be.visible");
  });

  it("이름을 한 개만 입력해도 차량 생성", () => {
    cy.generateCars(SINGLE_CAR_NAME);
    cy.get(ROUND_COUNT_FIELDSET).should("be.visible");
  });

  it("쉼표 없이 자동차 이름 입력", () => {
    cy.generateCars(INVALID_CAR_NAMES.CAR_NAMES_WITHOUT_COMMA);
    cy.on("window:alert", (text) => {
      expect(text).equal(CAR_FACTORY_ERROR_MESSAGES.CAR_NAME_LOGGER_THAN_MAX_LENGTH);
    });
  });

  it("중복된 차량 이름 입력", () => {
    cy.generateCars(INVALID_CAR_NAMES.DUPLICATED_CAR_NAMES);
    cy.on("window:alert", (text) => {
      expect(text).equal(CAR_FACTORY_ERROR_MESSAGES.CAR_NAMES_DUPLICATED);
    });
  });

  it("제한보다 긴 차량 이름 입력", () => {
    cy.generateCars(INVALID_CAR_NAMES.LONG_CAR_NAMES);
    cy.on("window:alert", (text) => {
      expect(text).equal(CAR_FACTORY_ERROR_MESSAGES.CAR_NAME_LOGGER_THAN_MAX_LENGTH);
    });
  });

  it("빈 이름 입력", () => {
    cy.generateCars(INVALID_CAR_NAMES.EMPTY_CAR_NAME);
    cy.on("window:alert", (text) => {
      expect(text).equal(CAR_FACTORY_ERROR_MESSAGES.CAR_NAME_IS_EMPTY);
    });
  });
});
