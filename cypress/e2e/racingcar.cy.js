import { ERROR_MESSAGES } from '/src/js/utils/constants.js';

describe('레이싱 카 어플리케이션 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('자동차에 이름을 부여할 수 있다.', () => {
    it('자동차의 이름을 입력할 수 있다.', () => {
      cy.get('#car-name-input').should('exist');
      cy.get('#car-name-submit-btn').should('exist');
      cy.get('#car-name-submit-btn').click();
    });

    it('자동차의 이름이 1~5자 사이의 문자가 아니라면 alert을 띄운다.', () => {
      cy.get('#car-name-submit-btn').click();
      cy.on('window:alert', str => {
        expect(str).to.equal(ERROR_MESSAGES.NAME_OUT_OF_RANGE);
      });
      cy.get('#car-name-input').type('Mercedes-Benz');
      cy.get('#car-name-submit-btn').click();
      cy.on('window:alert', str => {
        expect(str).to.equal(ERROR_MESSAGES.NAME_OUT_OF_RANGE);
      });
    });

    it('올바른 자동차 이름을 입력하면 시도할 횟수를 입력할 수 있다.', () => {
      cy.get('#car-name-input').type('Benz');
      cy.get('#car-name-submit-btn').click();
      cy.get('#set-trial-container').should('exist');
    });
  });
});
