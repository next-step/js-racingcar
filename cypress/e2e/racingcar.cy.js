import { ALERT_MESSAGE, LENGTH } from '../../src/js/constants.js';

const CAR_NAMES_ARRAY = ['a', 'b', 'c', 'd', 'e', 'f'];
const CAR_NAMES_SRING = ['a', 'b', 'c', 'd', 'e', 'f'].join(', ').trim();

describe('레이싱카 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('자동차 이름은 쉼표","를 기준으로 구분하며 입력한 글자수의', () => {
    it(`${LENGTH.CAR_NAME_MAX_LENGTH}글자 이하만 가능하고 자동차이름 fieldset이 비활성화된다.`, () => {
      cy.submitCarNameForm(CAR_NAMES_SRING);

      cy.getCarNameInput().should('be.disabled');
    });

    describe('길이가', () => {
      it(`${LENGTH.CAR_NAME_MIN_LENGTH}일 경우(아무것도 입력하지 않은경우) 오류를 발생시켜 error alert를 띄워준다.`, () => {
        cy.setEmptyStirngToInput('', '#car-name-form');

        cy.onOccurAlert(ALERT_MESSAGE.NOT_VALIDATE_NAME);
      });

      it(`${LENGTH.CAR_NAME_MAX_LENGTH}초과 일 경우 오류를 발생시켜 error alert를 띄워준다.`, () => {
        cy.submitCarNameForm('abcdef');

        cy.onOccurAlert(ALERT_MESSAGE.NOT_VALIDATE_NAME);
      });
    });
  });

  describe('시도횟수입력 Form은', () => {
    it('자동차 이름 입력후 제출한 이후 화면에 표시된다.', () => {
      cy.getCarTryNumberSection().should('have.class', 'hidden');
      cy.submitCarNameForm(CAR_NAMES_SRING);
      cy.getCarTryNumberSection().should('not.have.class', 'hidden');
    });

    it('자동차 이름 입력후 제출한 이후 자동으로 시도횟수입력하는 input창이 포커싱된다.', () => {
      cy.submitCarNameForm(CAR_NAMES_SRING);
      cy.getCarTryNumberInput().focus();
    });

    it(`${LENGTH.CAR_TRY_VALUE_MIN_LENGTH}보다 크다면 시도횟수입력 fieldset이 비활성화된다.`, () => {
      cy.submitCarNameForm(CAR_NAMES_SRING);
      cy.submitCarTryNumberForm('3');

      cy.getCarTryNumberFieldset().should('be.disabled');
    });

    it('시도횟수를 입력한 경우 game Section이 화면에 표시된다.', () => {
      cy.submitCarNameForm(CAR_NAMES_SRING);
      cy.getGameSeciton().should('have.class', 'hidden');
      cy.submitCarTryNumberForm(3);
      cy.getGameSeciton().should('not.have.class', 'hidden');
    });

    it('자동차에 이름을 부여할 수 있고, 자동차를 출력할 때 자동차 이름을 같이 출력한다.', () => {
      cy.submitCarNameForm(CAR_NAMES_SRING);
      cy.submitCarTryNumberForm('3');
      cy.getCarPlayer().each((car, index) => {
        expect(car.text().trim()).to.equal(CAR_NAMES_ARRAY[index]);
      });
    });

    it('입력한 이름 만큼 자동차가 존재한다.', () => {
      cy.submitCarNameForm(CAR_NAMES_SRING);
      cy.submitCarTryNumberForm(3);
      cy.getCarPlayer().should('have.length', CAR_NAMES_ARRAY.length);
    });

    describe('시도횟수 입력창의 길이가', () => {
      it(`${LENGTH.CAR_TRY_VALUE_MIN_LENGTH}일 경우(아무것도 입력하지 않은경우) 오류를 발생시켜 error alert를 띄워준다.`, () => {
        cy.submitCarNameForm(CAR_NAMES_SRING);
        cy.setEmptyStirngToInput('', '#car-try-number-form');
        cy.onOccurAlert(ALERT_MESSAGE.NO_VALUE_ENTERED);
      });
    });
  });
});
