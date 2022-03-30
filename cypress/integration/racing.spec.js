import { DOM } from '../../src/js/constants';

describe('자동차 경주 게임', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  context('처음 화면에 들어갔을 때', () => {
    it('자동차 이름을 입력할 수 있는 입력창이 보여야 합니다.', () => {
      cy.get(`#${DOM.CAR_NAMES_INPUT_ID}`).should('be.visible');
    });

    it('자동차 이름을 제출할 수 있는 버튼이 보여야 합니다.', () => {
      cy.get(`#${DOM.CAR_NAMES_SUBMIT_BUTTON_ID}`).should('be.visible');
    });
  });
});
