import { SELECTORS, MESSAGES } from '../../src/js/constant.js';

describe('자동차 경주 게임', () => {
  beforeEach(() => {
    cy.visit('../../index.html');
  });

  it('자동차 이름을 입력하는 입력창과 확인 버튼이 존재한다.', () => {
    cy.get(SELECTORS.CAR_NAME_INPUT).should('be.visible');
    cy.get(SELECTORS.CAR_NAME_SUBMIT_BUTTON).should('be.visible');
  });

  it('자동차 이름으로 빈값을 입력하면 경고창이 출력된다.', () => {
    const alertStub = cy.stub();

    cy.on('window:alert', alertStub);

    cy.get(SELECTORS.CAR_NAME_INPUT).clear();
    cy.get(SELECTORS.CAR_NAME_SUBMIT_BUTTON)
      .click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(MESSAGES.CAR_NAME_EMPTY);
      });
  });

  it('자동차 이름은 영문, 한글, 쉼표가 아니면 경고창이 출력된다.', () => {
    const alertStub = cy.stub();

    cy.on('window:alert', alertStub);

    cy.get(SELECTORS.CAR_NAME_INPUT).type('EAST/WEST/SOUTH/NORTH');
    cy.get(SELECTORS.CAR_NAME_SUBMIT_BUTTON)
      .click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(MESSAGES.CAR_NAME_NOT_MATCH_REGEXP);
      });
  });

  it('자동차 이름은 쉼표를 기준으로 5자 이하만 가능하다.', () => {
    const alertStub = cy.stub();

    cy.on('window:alert', alertStub);

    cy.get(SELECTORS.CAR_NAME_INPUT).type('EAST,WEST,SOUTH,JAVASCRIPT');
    cy.get(SELECTORS.CAR_NAME_SUBMIT_BUTTON)
      .click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(MESSAGES.CAR_NAME_LENGTH_OVER);
      });
  });

  it('자동차 이름을 입력하면 자동차 이름 입력창과 버튼이 비활성화 된다.', () => {
    cy.get(SELECTORS.CAR_NAME_INPUT).type('EAST,WEST,SOUTH,NORTH');
    cy.get(SELECTORS.CAR_NAME_SUBMIT_BUTTON).click();
    cy.get(SELECTORS.CAR_NAME_INPUT).should('be.disabled');
    cy.get(SELECTORS.CAR_NAME_SUBMIT_BUTTON).should('be.disabled');
  });

  it('자동차 이름을 입력하면 시도 횟수 입력창과 버튼이 노출된다.', () => {
    cy.get(SELECTORS.CAR_NAME_INPUT).type('EAST,WEST,SOUTH,NORTH');
    cy.get(SELECTORS.CAR_NAME_SUBMIT_BUTTON).click();
    cy.get(SELECTORS.RACE_LAP_INPUT).should('be.visible');
    cy.get(SELECTORS.RACE_LAP_SUBMIT_BUTTON).should('be.visible');
  });

  it('시도할 횟수를 빈값으로 입력하면 경고창이 출력된다.', () => {
    const alertStub = cy.stub();

    cy.on('window:alert', alertStub);

    cy.get(SELECTORS.CAR_NAME_INPUT).type('EAST,WEST,SOUTH,NORTH');
    cy.get(SELECTORS.CAR_NAME_SUBMIT_BUTTON).click();
    cy.get(SELECTORS.RACE_LAP_INPUT).clear();
    cy.get(SELECTORS.RACE_LAP_SUBMIT_BUTTON)
      .click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(MESSAGES.RACE_LAP_EMPTY);
      });
  });

  it('시도할 횟수를 제출하면 시도 횟수 입력창과 버튼이 비활성화 된다.', () => {
    cy.get(SELECTORS.CAR_NAME_INPUT).type('EAST,WEST,SOUTH,NORTH');
    cy.get(SELECTORS.CAR_NAME_SUBMIT_BUTTON).click();
    cy.get(SELECTORS.RACE_LAP_INPUT).type('10');
    cy.get(SELECTORS.RACE_LAP_SUBMIT_BUTTON).click();
    cy.get(SELECTORS.RACE_LAP_INPUT).should('be.disabled');
    cy.get(SELECTORS.RACE_LAP_SUBMIT_BUTTON).should('be.disabled');
  });
});
