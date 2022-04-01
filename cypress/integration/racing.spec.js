import { DOM, ERROR_MESSAGE } from '../../src/js/constants';

describe('자동차 경주 게임', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.reload();
  });

  context('처음 화면에 들어갔을 때', () => {
    it('자동차 이름을 입력할 수 있는 입력창이 보여야 합니다.', () => {
      cy.get(`#${DOM.CAR_NAMES_INPUT_ID}`).should('be.visible');
    });

    it('자동차 이름을 제출할 수 있는 버튼이 보여야 합니다.', () => {
      cy.get(`#${DOM.CAR_NAMES_SUBMIT_BUTTON_ID}`).should('be.visible');
    });
  });

  context('자동차 이름은 알맞게 입력되어야 합니다.', () => {
    it('최소 한 대의 자동차가 입력되어야 합니다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.get(`#${DOM.CAR_NAMES_SUBMIT_BUTTON_ID}`)
        .click()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGE.CAR_NAMES_REQUIRED);
        });
    });

    it('각각의 자동차 이름들은 5글자 이하입니다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.get(`#${DOM.CAR_NAMES_INPUT_ID}`).type('first, second, third');
      cy.get(`#${DOM.CAR_NAMES_SUBMIT_BUTTON_ID}`)
        .click()
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(ERROR_MESSAGE.INVALID_CAR_NAMES);
        });
    });

    it('자동차 이름이 잘 입력되었다면 시도 횟수 입력창이 보여야 합니다.', () => {
      cy.get(`#${DOM.CAR_NAMES_INPUT_ID}`).type('EAST, WEST, SOUTH, NORTH');
      cy.get(`#${DOM.CAR_NAMES_SUBMIT_BUTTON_ID}`).click();

      cy.get(`#${DOM.TRY_COUNT_INPUT_ID}`).should('be.visible');
      cy.get(`#${DOM.TRY_COUNT_SUBMIT_BUTTON_ID}`).should('be.visible');
    });
  });
});

/*
  - [ ] 쉼표를 기준으로 5글자가 넘어가는 이름이 있으면 경고창을 띄운다.
  - [ ] 최소한 하나의 자동차도 없으면 경고창을 띄운다.
  - [ ] 제대로 입력됐다면 시도 횟수를 입력받는 입력창과 버튼을 보여준다.
*/
