/* eslint-disable no-undef */

import { ALERT_MESSAGE, CAR_RACING } from '../../src/js/service/constant';
import { ELEMENT } from '../../src/js/ui/element';

describe('자동차 경주 게임 요구사항을 점검한다', () => {
  const URL = '../../index.html';
  const STRING_CAR_NAMES = '갑,을,병,정,무,기,경,신,임,계';
  const STRING_CAR_NAMES_ARRAY = STRING_CAR_NAMES.split(',');

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

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

    it('시도 횟수를 입력하지 않으면 오류 메시지를 출력한다', () => {
      const stub = cy.stub();
      cy.on('window:alert', stub);

      cy.get(ELEMENT.BUTTON.ATTEMT_TIMES_CONFIRM)
        .click()
        .then(() => expect(stub.getCall(0)).to.be.calledWith(ALERT_MESSAGE.INVALID.ATTEMPT_TIMES));
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

  describe.only('3단계: 경주를 시작한다', () => {
    const ATTEMPT_TIMES = 5;
    const TIMEOUT = CAR_RACING.RACING_SPEED * (ATTEMPT_TIMES + 1);

    beforeEach(() => {
      cy.get(ELEMENT.INPUT.CAR_NAMES).type(STRING_CAR_NAMES).type('{enter}');
      cy.get(ELEMENT.INPUT.ATTEMPT_TIMES).type(ATTEMPT_TIMES).type('{enter}');
    });

    /**
     *
     * @param {function} callback
     */
    const lazyStart = (callback) => {
      cy.then({ timeout: TIMEOUT }, async () => {
        await sleep(TIMEOUT);
        callback();
      });
    };

    it('경주 종료 후 화살표의 개수 최대치는 "시도횟수"만큼이다', () => {
      lazyStart(() => {
        STRING_CAR_NAMES_ARRAY.forEach((carName) => {
          cy.get(`[data-car-name="${carName}"] .forward-icon`).should('have.length.lessThan', ATTEMPT_TIMES + 1);
        });
      });
    });

    it('다시 시작하기 버튼을 누르면 게임을 초기화하고 자동차 이름을 입력하는 화면으로 돌아간다', () => {
      lazyStart(() => {
        cy.get(ELEMENT.BUTTON.RESTART).click();
        cy.get(ELEMENT.FIELD.ATTEMPT_TIMES).should('not.be.visible');
        cy.get(ELEMENT.SECTION.CAR_RACING).should('not.be.visible');
        cy.get(ELEMENT.SECTION.WINNER).should('not.be.visible');
      });
    });
  });
});
