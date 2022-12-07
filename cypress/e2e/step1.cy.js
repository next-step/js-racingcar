import { HAS_SAME_CAR_NAME_MESSAGE, INVALID_CAR_NAME_MESSAGE } from '../../src/js/constants.js';
import { getCarNames } from '../../src/js/utils/getCarNames.js';

describe('자동차 경주 게임 step1 ', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const getCarNamesInput = () => cy.get('#carNamesInput');
  const getCarNamesSubmit = () => cy.get('#carNamesSubmit');
  const getRacingCountForm = () => cy.get('#racingCountForm');
  const getAlertObj = () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);
    return alertStub;
  };

  describe('자동차에 이름을 부여할 수 있다.', () => {
    it('자동차 이름을 입력할 input이 존재한다.', () => {
      getCarNamesInput().should('exist');
      getCarNamesInput().should('be.visible');
    });
    it('자동차에 부여한 이름을 제출할 버튼이 존재한다.', () => {
      getCarNamesSubmit().should('exist');
      getCarNamesSubmit().should('be.visible');
    });
  });

  describe('자동차 이름은 쉼표를 기준으로 구분한다. 이름은 5자 이하만 가능하다.', () => {
    it(`자동차이름은 1자 미만(공백)으로 입력한 뒤 제출하면 ${INVALID_CAR_NAME_MESSAGE}라는 경고를 띄운다.`, () => {
      const alert = getAlertObj();
      getCarNamesInput().type(' ');
      getCarNamesSubmit()
        .click()
        .then(() => {
          const actualMessage = alert.getCall(0).lastArg;
          expect(actualMessage).to.equal(INVALID_CAR_NAME_MESSAGE);
        });
    });
    it('자동차이름은 5자 이상으로 입력한 뒤 제출하면 경고창을 띄운다.', () => {
      const alert = getAlertObj();
      getCarNamesInput().type('123456');
      getCarNamesSubmit()
        .click()
        .then(() => {
          const actualMessage = alert.getCall(0).lastArg;
          expect(actualMessage).to.equal(INVALID_CAR_NAME_MESSAGE);
        });
    });
    it('getCarNames 함수에 쉼표가 포함된 이름을 입력하면, 쉼표로 구분하여 이름을 추출한다.', () => {
      const inputValue = '12, 3 4, 5,6';
      const carNames = getCarNames(inputValue);
      expect(carNames.length).to.equal(4);
    });
    it('쉼표 이후 자동차 이름이 없이 공백인 경우, 경고창을 띄운다.', () => {
      const alert = getAlertObj();
      getCarNamesInput().type('12, ');
      getCarNamesSubmit()
        .click()
        .then(() => {
          const actualMessage = alert.getCall(0).lastArg;
          expect(actualMessage).to.equal(INVALID_CAR_NAME_MESSAGE);
        });
    });
    it(`중복된 이름을 입력한 경우, ${HAS_SAME_CAR_NAME_MESSAGE}라는 경고창을 띄운다.`, () => {
      const alert = getAlertObj();
      getCarNamesInput().type('1, 12, 1 2');
      getCarNamesSubmit()
        .click()
        .then(() => {
          const actualMessage = alert.getCall(0).lastArg;
          expect(actualMessage).to.equal(HAS_SAME_CAR_NAME_MESSAGE);
        });
    });

    it('자동차이름을 정상적으로 입력한 뒤 제출하면 이동 횟수 입력 폼을 띄운다.', () => {
      getCarNamesInput().type('123, 456, 789');
      getCarNamesSubmit()
        .click()
        .then(() => {
          getRacingCountForm().should('exist');
          getRacingCountForm().should('be.visible');
        });
    });
  });
  });
});
