import { deleteDelay } from "../../src/js/component/racingCar";
import { DELIMITER } from "../../src/js/utils/constant";
import { ERROR_MESSAGE } from "../../src/js/utils/error";
import { SECOND } from "../../src/js/utils/event";
import { ATTRIBUTE, CAR_ATTRIBUTE, COMPONENT, ID } from "../../src/js/utils/selector";

const URL = 'http://localhost:5500';
const CAR_NAME_INPUT = "#" + COMPONENT.CAR_INPUT;
const CAR_NAMES = ".car-player";
const INPUT = "car1, car2, car3";
const INPUT_LIST = INPUT.split(",").map(item => item.trim());
const OVER_LENGTH_INPUT = "name, cawerwer";
const TRY_NUM_INPUT = "#" + COMPONENT.TRY_INPUT;
const TRY_NUMBER = 5;
const NOT_NATURAL_NUMBER = 0;

const typeTarget = (target, input) => {
  cy.get(target)
    .type(input)
    .type('{enter}')
}

const alertStub = () => cy.on('window:alert', cy.stub().as('alerted'));
const checkAlertWtihMessage = message => 
    cy.get('@alerted').should('have.been.calledOnce').and('have.been.calledWith', message);

const checkAlert = () => cy.get('@alerted').should('have.been.calledOnce');

const stubMathRandom = () => {
  let counter = 101
  cy.window().then((win) => {
    cy.stub(win.Math, 'random').callsFake(() => counter++)
  })
}

describe("자동차의 입력값을 테스트한다", () => {
  beforeEach("자동차의 값을 입력한다", () => {
    cy.visit(URL)

    cy.get(COMPONENT.TRY_SECTION)
      .should('have.class', ATTRIBUTE.HIDDEN)
  })

  
  it("자동차 이름은 `쉼표(,)`를 기준으로 구분한다.", () => {
    typeTarget(CAR_NAME_INPUT, INPUT)
    typeTarget(TRY_NUM_INPUT, NOT_NATURAL_NUMBER)

    cy.get(CAR_NAMES)
      .invoke('text')
      .should('eq', INPUT_LIST.join(""))

    cy.get(COMPONENT.TRY_SECTION)
    .should('not.have.class', CAR_ATTRIBUTE.HIDDEN)
  })

  it("자동차 이름은 5자 이하여야한다.", () => {
    alertStub()
    typeTarget(CAR_NAME_INPUT, OVER_LENGTH_INPUT)

    checkAlertWtihMessage(ERROR_MESSAGE.INVALID_NAME_LENGTH)
  })

  it("빈 문자열은 입력할 수 없다", () => {
    alertStub()

    cy.get(CAR_NAME_INPUT)
    .invoke('val', '')

    cy.get(CAR_NAME_INPUT)
    .type('{enter}')

    checkAlertWtihMessage(ERROR_MESSAGE.INVALID_NAME_LENGTH)
  })
})


describe("시도횟수의 입력값을 테스트한다", () => {

  beforeEach("자동차의 이름 입력 후 시도회수를 확인한다", () => {
    cy.visit(URL)
    typeTarget(CAR_NAME_INPUT, INPUT)
  })

  it("시도 회수는 0회 이상이어야한다", () => {
    alertStub()
    typeTarget(TRY_NUM_INPUT, NOT_NATURAL_NUMBER)

    checkAlertWtihMessage(ERROR_MESSAGE.INVALID_TRY_SIZE)
  })
})

const inputAll = () => {
  cy.visit(URL)
    typeTarget(CAR_NAME_INPUT, INPUT)
    typeTarget(TRY_NUM_INPUT, TRY_NUMBER)
}

describe("우승자와 이벤트를 확인한다.", () => {
  beforeEach("자동차의 이름과 시도횟수를 입력한다", () => {
    cy.clock()
    inputAll()
  })

  it("우승자는 입력한 목록중에 존재해야한다", () => {
    cy.tick(SECOND * TRY_NUMBER * 2)
    cy.get(COMPONENT.WINNER)
      .invoke('text')
      .invoke('split', `${DELIMITER.DISTING}`)
      .then(winner => expect(INPUT_LIST).to.include.members(winner))
  })

  it("시작한 직후에는 대기상태로 들어간다", () => {
    cy.get(ID+CAR_ATTRIBUTE.CAR_DELAY_ID)
  })

  // it("매 시간초마다 대기상태가 제거되고 진행상태를 나타낸다", () => {
  //   const o = {
  //     deleteDelay: deleteDelay()
  //   }
  //   cy.tick(SECOND)
  //   cy.stub(o, 'deleteDelay').as('delete')
  //   cy.tick(SECOND * 2)
  //   cy.get('@delete').should('have.been.called')
  // })
  // tick은 특정시간만 조작 가능, during의 개념 XX

  it("시행 종료 후에는 우승자 메세지가 나온다", () => {
    alertStub()
    cy.tick(SECOND * (TRY_NUMBER+3))

    checkAlert()
  })
})

