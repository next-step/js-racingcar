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
      cy.get('.car-player')
        .should('have.length', 4)
        .eq(0)
        .should('have.text', 'terry');
    });
  });
});
