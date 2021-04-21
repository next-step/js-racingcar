import { ERROR_MESSAGE } from "../../src/js/utils/error";
import { CAR_ATTRIBUTE, COMPONENT } from "../../src/js/utils/selector";

describe("자동차의 입력값을 테스트한다", () => {
  const CAR_NAME_INPUT = "#" + COMPONENT.CAR_INPUT;
  const CAR_NAMES = ".car-player";
  const INPUT = "car1, car2, car3";
  const INPUT_LIST = INPUT.split(",").map(item => item.trim());
  const OVER_LENGTH_INPUT = "name, cawerwer";

  beforeEach("자동차의 값을 입력한다", () => {
    cy.visit('http://localhost:5500')

    cy.get(COMPONENT.TRY_SECTION)
      // .should('have.class', CAR_ATTRIBUTE.HIDDEN)
  })

  it("자동차 이름은 `쉼표(,)`를 기준으로 구분한다.", () => {
    cy.get(CAR_NAME_INPUT)
    .type(INPUT)
    .type('{enter}')

    cy.get(CAR_NAMES)
      .invoke('text')
      .should('eq', INPUT_LIST.join(""))

    cy.get(COMPONENT.TRY_SECTION)
    .should('not.have.class', CAR_ATTRIBUTE.HIDDEN)
  })

  it("자동차 이름은 5자 이하여야한다.", () => {
    cy.on('window:alert', cy.stub().as('alerted'))
    cy.get(CAR_NAME_INPUT)
    .type(OVER_LENGTH_INPUT)
    .type('{enter}')

    cy.get('@alerted').should('have.been.calledOnce')
    .and('have.been.calledWith', ERROR_MESSAGE.INVALID_NAME_LENGTH)
  })

  it("빈 문자열은 입력할 수 없다", () => {
    cy.on('window:alert', cy.stub().as('alerted'))

    cy.get(CAR_NAME_INPUT)
    .invoke('val', '')

    cy.get(CAR_NAME_INPUT)
    .type('{enter}')

    cy.get('@alerted').should('have.been.calledOnce')
    .and('have.been.calledWith', ERROR_MESSAGE.INVALID_NAME_LENGTH)
  })
})


describe("시도횟수의 입력값을 테스트한다", () => {
  const TRY_NUM_INPUT = "#" + COMPONENT.TRY_INPUT;
  const CAR_NAME_INPUT = "#" + COMPONENT.CAR_INPUT;
  const INPUT = "car1, car2, car3";
  const NOT_NATURAL_NUMBER = 0;

  beforeEach("자동차의 이름 입력 후 시도회수를 확인한다", () => {
    cy.visit('http://localhost:5500')

    cy.get(CAR_NAME_INPUT)
    .type(INPUT)
    .type('{enter}')
  })

  it("시도 회수는 0회 이상이어야한다", () => {
    cy.on('window:alert', cy.stub().as('alerted'))
    cy.get(TRY_NUM_INPUT)
    .type(NOT_NATURAL_NUMBER)
    .type('{enter}')

    cy.get('@alerted').should('have.been.calledOnce')
    .and('have.been.calledWith', ERROR_MESSAGE.INVALID_TRY_SIZE)
  })
})


