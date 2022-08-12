import { INVALID_MESSAGES } from '../../src/js/modules/ValidationError';

const TEST_GOAL_POSITION_NUMBER = 5;
const CAR_NAMES_SELECTOR = {
  FIELD: 'fieldset[id=car-names-field]',
  INPUT: 'input[name=car_names_input]',
  BTN: 'button[id=car-names-btn]',
};
const GOAL_POSITION_NUMBER_SELECTOR = {
  FIELD: 'fieldset[id=goal-position-field]',
  INPUT: 'input[name=goal_position_number_input]',
  BTN: 'button[id=goal-position-number-btn]',
};

const RACE_STATUS_SELECTOR = {
  DIV: 'div[id=race-status-div]',
};

const RACE_WINNER_SELECTOR = {
  DIV: 'div[id=race-winner-div]',
  INIT_BTN: 'button[id=init-btn]',
};
const mockCarNames = 'EAST, WEST, SOUTH, NORTH';

describe('레이싱 어플리케이션', () => {
  describe('자동차 이름 입력', () => {
    beforeEach(() => {
      cy.visit('../../index.html');
    });
    it('자동차 이름을 입력할수 있는 input과 button이 보이는지 먼저 체크를 한다.', () => {
      cy.get(CAR_NAMES_SELECTOR.INPUT).should('be.visible');
      cy.get(CAR_NAMES_SELECTOR.BTN).should('be.visible');
    });

    it(`이름이 비어있을 경우 에러메시지를 띄워준다`, () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.get(CAR_NAMES_SELECTOR.INPUT).clear();
      cy.get(CAR_NAMES_SELECTOR.BTN)
        .click()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(
            INVALID_MESSAGES.NAME.EMPTY
          );
        });
    });

    it('이름이 5자가 넘어갔을 경우 에러메시지를  띄워준다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.get(CAR_NAMES_SELECTOR.INPUT).type('yunseo');
      cy.get(CAR_NAMES_SELECTOR.BTN)
        .click()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(
            INVALID_MESSAGES.NAME.MAX_LENGTH
          );
        });
    });
  });

  describe('시도할 횟수 입력', () => {
    beforeEach(() => {
      cy.visit('../../index.html');
      cy.get(CAR_NAMES_SELECTOR.INPUT).type(mockCarNames);
      cy.get(CAR_NAMES_SELECTOR.BTN).click();
    });

    it('이름 입력 후 확인 클릭시, 이름 입력 필드는 disabled 되고 시도할 횟수 입력폼이 나온다.', () => {
      cy.get(CAR_NAMES_SELECTOR.FIELD).should('be.disabled');
      cy.get(GOAL_POSITION_NUMBER_SELECTOR.INPUT).should('be.visible');
      cy.get(GOAL_POSITION_NUMBER_SELECTOR.BTN).should('be.visible');
    });
    it('시도 횟수를 입력하지 않을경우 invalid 메시지가 나온다.', () => {
      cy.get(GOAL_POSITION_NUMBER_SELECTOR.INPUT).clear();
      cy.get(GOAL_POSITION_NUMBER_SELECTOR.BTN).click();
      cy.get('input[name=goal_position_number_input]:invalid').should(
        'have.length',
        1
      );
    });

    it('시도 횟수 입력시, 시도 횟수 입력 필드는 disabled 되고 진행상황을 확인할 수 있다.', () => {
      cy.get(GOAL_POSITION_NUMBER_SELECTOR.INPUT).type(
        `${TEST_GOAL_POSITION_NUMBER}`
      );
      cy.get(GOAL_POSITION_NUMBER_SELECTOR.BTN).click();
      cy.get(GOAL_POSITION_NUMBER_SELECTOR.FIELD).should('be.disabled');
      cy.wait(6000);
      cy.get(RACE_WINNER_SELECTOR.DIV).should('be.visible');
    });
    it('다시 시작하기 클릭시 화면이 초기화 된다.', () => {
      cy.get(GOAL_POSITION_NUMBER_SELECTOR.INPUT).type(`${1}`);
      cy.get(GOAL_POSITION_NUMBER_SELECTOR.BTN).click();
      cy.wait(6000);
      cy.get(RACE_WINNER_SELECTOR.INIT_BTN).click();

      cy.get(CAR_NAMES_SELECTOR.INPUT).should('not.include.value');

      cy.get(GOAL_POSITION_NUMBER_SELECTOR.INPUT).should('not.include.value');
      cy.get(GOAL_POSITION_NUMBER_SELECTOR.FIELD).should('be.hidden');
      cy.get(RACE_STATUS_SELECTOR.DIV).should('be.hidden');
      cy.get(RACE_WINNER_SELECTOR.DIV).should('be.hidden');
    });
  });
});
