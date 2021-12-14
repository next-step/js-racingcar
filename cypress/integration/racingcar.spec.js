const { test$ } = require('../../src/js/utils/utils.js');
const { TEST_DOM, ERROR_MESSAGES } = require('../../src/js/constants.js');
import { DONE_MESSAGE, ONE_SECOND } from '../../src/js/constants.js';

before(() => {
  cy.visit('http://127.0.0.1:8080');
});

const checkError = (errorMessage) => {
  cy.on('uncaught:exception', (err) => {
    expect(err.message).to.contains(errorMessage);
    return false;
  });
};

describe('racing-car', () => {
  const validCarNames = 'a, b, c';
  const validTryCounts = '5';

  describe('최초 접속시', () => {
    it('최초 접속시 자동차 이름을 입력하는 부분만 보인다.', () => {
      cy.get(test$(TEST_DOM.CAR_NAMES_FORM)).should('be.visible');

      [TEST_DOM.TRY_COUNTS_FORM, TEST_DOM.CAR_PROGRESS_CONTAINER, TEST_DOM.WINNER_BOARD].forEach(
        (domId) => {
          cy.get(test$(domId)).should('not.be.visible');
        }
      );
    });
  });

  describe('자동차 이름 입력', () => {
    it(`하나라도 이름이 입력되지 않으면 에러`, () => {
      checkError(ERROR_MESSAGES.NO_CAR_NAMES);

      cy.typeCarNamesAndSubmit('');
      cy.typeCarNamesAndSubmit(',');
      cy.typeCarNamesAndSubmit(', ');
      cy.typeCarNamesAndSubmit('123, ,2');
      cy.typeCarNamesAndSubmit('123, ,2,');
    });

    it('하나라도 5글자 이상이면 에러', () => {
      checkError(ERROR_MESSAGES.MAXIMUM_CAR_NAMES_LENGTH);

      cy.typeCarNamesAndSubmit('123456, 1, 12');
      cy.typeCarNamesAndSubmit('123456');
    });

    it('올바르게 자동차 이름 입력한 경우', () => {
      cy.typeCarNamesAndSubmit(validCarNames);
      cy.get(test$(TEST_DOM.TRY_COUNTS_FORM)).should('be.visible');
    });
  });

  describe('시도 횟수 입력', () => {
    it('입력하지 않으면 에러', () => {
      checkError(ERROR_MESSAGES.NO_TRY_COUNTS);

      cy.typeTryCountsAndSubmit('');
    });

    [',', '-', 'a'].forEach((notNumber) => {
      it(`숫자 아닌 것(${notNumber}) 입력하면 다음 단계로 진행되지 않음`, () => {
        cy.get(test$(TEST_DOM.TRY_COUNTS_INPUT)).type(notNumber);

        [TEST_DOM.CAR_PROGRESS_CONTAINER, TEST_DOM.WINNER_BOARD].forEach((domId) => {
          cy.get(test$(domId)).should('not.be.visible');
        });
      });
    });

    it('0 이하로 입력하면 에러', () => {
      checkError(ERROR_MESSAGES.MINIMUM_TRY_COUNTS);
      cy.typeTryCountsAndSubmit('0');
      cy.typeTryCountsAndSubmit('-1');
    });

    it('올바르게 시도 횟수 입력한 경우 (tryCounts-1)초 뒤에 우승자 정보가 보이고, 2초 뒤에 축하 메시지가 alert 된다.', () => {
      cy.typeTryCountsAndSubmit(validTryCounts);
      cy.get(test$(TEST_DOM.CAR_PROGRESS)).should('have.length', validCarNames.split(',').length);

      cy.wait(validTryCounts * ONE_SECOND);
      cy.get(test$(TEST_DOM.WINNER_BOARD)).should('be.visible');

      cy.wait(2 * ONE_SECOND);
      cy.on('window:alert', (msg) => {
        expect(msg).to.equal(DONE_MESSAGE);
      });
    });
  });
});
