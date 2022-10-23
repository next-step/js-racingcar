import { CAR_NAME_MAX_LENGTH, errorMessages, carNames, attempts } from '../../src/js/constants';

describe('자동차 경주', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('자동차 이름을 입력한다.', () => {
    beforeEach(() => {
      cy.get('.init-hide').should('not.be.visible');
    });

    it(`쉼표를 기준으로 구분하며 이름이 ${CAR_NAME_MAX_LENGTH}자를 초과하면 경고창을 띄운다`, () => {
      cy.get('.car-name').type(carNames.WRONG);
      cy.invaildInputValue('.btn-car-name', errorMessages.INVALID_CAR_NAMES);
    });

    it('이름이 입력되지 않을 경우 경고창을 띄운다.', () => {
      cy.invaildInputValue('.btn-car-name', errorMessages.INVALID_CAR_NAMES);
    });


    it('자동차 이름은 쉼표를 기준으로 구분하며 1자 이상 5자 이하만 가능하다', () => {
      cy.inputFields('.car-name', '.btn-car-name', carNames.RIGHT);
    });
  });

  describe('시도 횟수를 입력한다.', () => {
    beforeEach('시도 횟수 입력 영역을 표시한다', () => {
      cy.inputFields('.car-name', '.btn-car-name', carNames.RIGHT);
    })
    
    it('1회 미만의 숫자가 입력 될 경우 경고창을 띄운다', () => {
      cy.get('.attempts-count').type(attempts.WRONG);
      cy.invaildInputValue('.btn-attempts-count', errorMessages.INVALID_ATTEMPT);
    });

    it('1회 이상의 시도 횟수를 입력한다', () => {
      cy.inputFields('.attempts-count', '.btn-attempts-count', attempts.RIGHT);
    });
  });
});
