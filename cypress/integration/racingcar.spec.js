import { ALERT } from '../../src/js/util/constants.js';

before(() => {
  cy.visit('/');
});

describe('racingcar stpe1', () => {
  context('참가자 입력', () => {
    it('5글자 초과시 alert 발생', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);
      cy.submitNames('terryjerry, helloterry, hellojerry').then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(ALERT.MAX_NAME_LENGTH);
      });
    });

    it('참가자가 1명일 경우 alert 발생', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);
      cy.submitNames('terry').then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(ALERT.MIN_PEOPLE_LENGTH);
      });
    });

    it('정상입력 시 시도 횟수 input 추가', () => {
      cy.submitNames('terry, jerry, soul, pixar');
      cy.checkCss('#tryCountFormSection', 'display', 'block');
    });

    it('참가자 유효성 체크', () => {
      cy.submitTryCount(3);
      cy.checkCss('#playSection', 'display', 'block');

      ['terry', 'jerry', 'soul', 'pixar'].forEach((name, index) => {
        cy.get('.car-player')
          .should('have.length', 4)
          .eq(index)
          .should('have.text', name);
      });
    });

    it('3초 뒤 결과 렌더링', () => {
      cy.wait(3000);
      cy.checkCss('#winnerSection', 'display', 'block');
    });

    it('2초 뒤 축하 메시지 alert', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.wait(2000).then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(
          ALERT.CONGRATULATION_TEXT
        );
      });
    });

    it('다시 시작 버튼 클릭 시 초기화', () => {
      cy.clickResetBtn();
      cy.resetGameView();
    });
  });
});
