/// <reference types="cypress" />
import { ROUNDS_INPUT_ERROR_MESSAGES } from "../../src/js/utils/errorMessage";
import { INVALID_ROUNDS, VALID_ROUNDS } from "../fixtures/rounds";

beforeEach(() => {
  cy.visit("http://localhost:5500");
});

describe("rounds input", () => {
  it("정상적인 시도 횟수 입력", () => {
    cy.setRounds(VALID_ROUNDS);
    cy.checkIsCarsReady();
  });

  it("일반 스트링 입력", () => {
    cy.setRounds(INVALID_ROUNDS.STRING);
    cy.checkHandleInvalidRounds();
  });

  it("0 입력", () => {
    cy.setRounds(INVALID_ROUNDS.ZERO);
    cy.checkAlertMessage(ROUNDS_INPUT_ERROR_MESSAGES.ROUNDS_IN_NOT_POSITIVE_INTEGER);
    cy.checkHandleInvalidRounds();
  });

  it("빈 값 입력", () => {
    cy.setRounds(INVALID_ROUNDS.EMPTY);
    cy.checkAlertMessage(ROUNDS_INPUT_ERROR_MESSAGES.ROUNDS_IN_NOT_POSITIVE_INTEGER);
    cy.checkHandleInvalidRounds();
  });

  it("음의 정수 입력", () => {
    cy.setRounds(INVALID_ROUNDS.NEGATIVE_INTEGER);
    cy.checkAlertMessage(ROUNDS_INPUT_ERROR_MESSAGES.ROUNDS_IN_NOT_POSITIVE_INTEGER);
    cy.checkHandleInvalidRounds();
  });
});
