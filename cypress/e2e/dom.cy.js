/* eslint-disable no-undef */

import { ALERT_MESSAGE } from '../../src/js/service/constant';
import { ELEMENT } from '../../src/js/ui/element';

describe('자동차 경주 게임 요구사항을 점검한다', () => {
  const URL = '../../index.html';
  const STRING_CAR_NAMES = '갑,을,병,정,무,기,경,신,임,계';

  beforeEach(() => {
    cy.visit(URL);
  });

  describe('1단계: 자동차 이름을 입력한다.', () => {
    it('자동차 이름 입력 확인 버튼이 있다', () => {
      cy.get(ELEMENT.BUTTON.CAR_NAME_CONFIRM).should('be.visible');
    });

    it('자동차 이름 입력 폼에 이름은 1자~5자까지만 가능하다', () => {
      const stub = cy.stub();
      cy.on('window:alert', stub);

      ['갑을병정무기경신임계', '동해물과백두산이', '동,,해물과백두산', '동해,물,과,백두,산이,'].forEach((names) => {
        cy.get(ELEMENT.INPUT.CAR_NAMES).type(names);
        cy.get(ELEMENT.BUTTON.CAR_NAME_CONFIRM)
          .click()
          .then(() => expect(stub.getCall(0)).to.be.calledWith(ALERT_MESSAGE.INVALID.CAR_NAMES_LENGTH));
      });
    });

    it('자동차 이름 입력 후 확인 버튼을 누르면 시도할 횟수를 입력하는 상자가 뜬다', () => {
      cy.get(ELEMENT.INPUT.CAR_NAMES).type(STRING_CAR_NAMES);
      cy.get(ELEMENT.BUTTON.CAR_NAME_CONFIRM).click();
      cy.get(ELEMENT.FIELD.ATTEMPT_TIMES).should('be.visible');
    });

    it('자동차 이름 입력 후 엔터를 누르면 시도할 횟수를 입력하는 상자가 뜬다', () => {
      cy.get(ELEMENT.INPUT.CAR_NAMES).type(STRING_CAR_NAMES);
      cy.get(ELEMENT.INPUT.CAR_NAMES).type(`{enter}`);
      cy.get(ELEMENT.FIELD.ATTEMPT_TIMES).should('be.visible');
    });
  });

  describe('2단계: 시도할 횟수를 입력한다', () => {
    beforeEach(() => {
      cy.get(ELEMENT.INPUT.CAR_NAMES).type(STRING_CAR_NAMES).type('{enter}');
    });

    it('시도 횟수 입력 버튼이 있다', () => {
      cy.get(ELEMENT.BUTTON.ATTEMT_TIMES_CONFIRM).should('be.visible');
    });

    it.only('시도 횟수가 1회 미만인 경우 예외를 발생시킨다', () => {
      const stub = cy.stub();
      cy.on('window:alert', stub);

      ['0', '-1', String(Number.MIN_SAFE_INTEGER)].forEach((input) => {
        cy.get(ELEMENT.INPUT.ATTEMPT_TIMES).type(input);
        cy.get(ELEMENT.BUTTON.ATTEMT_TIMES_CONFIRM)
          .click()
          .then(() => {
            expect(stub.getCall(0)).to.be.calledWith(ALERT_MESSAGE.INVALID.ATTEMPT_TIMES);
          });
      });
    });

    it('시도 횟수 입력 후 확인 버튼을 누르면 자동차 경주 영역이 보인다', () => {
      cy.get(ELEMENT.INPUT.ATTEMPT_TIMES).type('1');
      cy.get(ELEMENT.BUTTON.ATTEMT_TIMES_CONFIRM).click();
      cy.get(ELEMENT.SECTION.CAR_RACING).should('be.visible');
    });

    it('시도 횟수 입력 후 엔터를 누르면 자동차 경주 영역이 보인다', () => {
      cy.get(ELEMENT.INPUT.ATTEMPT_TIMES).type('1').type('{enter}');
      cy.get(ELEMENT.SECTION.CAR_RACING).should('be.visible');
    });
  });

  describe('3단계: 경주를 시작한다', () => {
    it('경주 종료 후 화살표의 개수는 "시도횟수-1개"이다', () => {
      expect(false).to.be.true;
    });
    // TODO: 2단계와 3단계 요구사항은 STEP2 이후에 입력
  });
});
