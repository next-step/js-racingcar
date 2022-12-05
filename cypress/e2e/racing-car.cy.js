import { ALERT_ERROR_MESSAGE } from '../../src/js/constants.js';

describe('자동차경주게임 테스트.', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html');
  });
  it('페이지 테스트', () => {
    cy.visit('http://127.0.0.1:5500/index.html');
  });

  describe('자동차 이름 입력 테스트', () => {
    it('자동차 이름을 입력하는 input이 존재한다.', () => {
      cy.get('#car-name-input').should('exist');
      cy.get('#car-name-input').should('be.visible');
    });

    it('자동차 이름을 확인 하는 버튼이 존재한다.', () => {
      cy.get('#car-name-input-button').should('exist');
      cy.get('#car-name-input-button').should('be.visible');
    });

    it('자동차 이름은 1글자 ~ 5글자 사이로 제한한다.', () => {
      cy.get('#car-name-input').click();
      cy.get('#car-name-input').type('1,12,123,123456');
      cy.get('#car-name-input-button').click();

      cy.on('window:alert', (text) => {
        expect(text).to.contains(ALERT_ERROR_MESSAGE.UNCORRECT_RANGE);
      });
    });
  });

  describe('시도횟수 테스트', () => {
    it('시도횟수를 입력하는 input이 존재한다.', () => {
      cy.get('#attempt-number-input').should('exist');
      cy.get('#attempt-number-input').should('be.visible');
    });

    it('시도횟수를 확인 하는 버튼이 존재한다.', () => {
      cy.get('#attempt-number-input').should('exist');
      cy.get('#attempt-number-input').should('be.visible');
    });

    it('시도횟수는 0이상의 숫자를 입력해야한다.', () => {
      cy.get('#attempt-number-input').click();
      cy.get('#attempt-number-input').type('0');

      cy.on('window:alert', (text) => {
        expect(text).to.contains(ALERT_ERROR_MESSAGE.UNCORRECT_NUMBER_RANGE);
      });
    });
  });
});
