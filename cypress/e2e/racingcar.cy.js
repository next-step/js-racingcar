import { ERROR_MESSAGES } from '/src/js/utils/constants.js';

describe('레이싱 카 어플리케이션 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('자동차에 이름을 부여할 수 있다.', () => {
    it('자동차의 이름을 입력할 수 있다.', () => {
      cy.get('.car-name-input').should('exist');
      cy.get('.car-name-submit-btn').should('exist');
      cy.get('.car-name-submit-btn').click();
    });

    it('자동차의 이름이 1~5자 사이의 문자가 아니라면 alert을 띄운다.', () => {
      cy.get('.car-name-submit-btn').click({ force: true });
      cy.isAlert(ERROR_MESSAGES.NAME_OUT_OF_RANGE);
      cy.setName('Mercedes-Benz');
      cy.isAlert(ERROR_MESSAGES.NAME_OUT_OF_RANGE);
    });

    it('자동차의 이름이 중복되면 alert을 띄운다.', () => {
      cy.setName('benz, benz');
      cy.isAlert(ERROR_MESSAGES.DUPLICATED_NAME);
    });
  });

  describe('사용자는 몇번을 이동할 것인지 입력할 수 있다.', () => {
    beforeEach(() => {
      cy.setName('Benz');
    });

    it('올바른 자동차 이름을 입력하면 시도할 횟수를 입력할 수 있다.', () => {
      cy.get('.trial-container').should('exist');
      cy.setTrialCount('3');
    });

    it('시도할 횟수를 입력할 수 있다.', () => {
      cy.get('.trial-container').should('exist');
    });

    it('시도할 횟수는 1 이상이어야 한다.', () => {
      cy.setTrialCount('0');
      cy.isAlert(ERROR_MESSAGES.INVALID_TRIAL_COUNT);

      cy.setTrialCount('-100');
      cy.isAlert(ERROR_MESSAGES.INVALID_TRIAL_COUNT);
    });

    it('시도할 횟수는 숫자만 입력되어야 한다.', () => {
      cy.get('.trial-input').type('abc뛟쒧10!@#');
      cy.get('.trial-input').should('have.value', '10');
    });
  });

  describe('주어진 횟수 동안 n대의 자동차는 전진 또는 멈출 수 있다.', () => {
    it('시도할 횟수를 입력하면, 입력한 이름이 순서대로 화면에 표출된다.', () => {
      const cars = 'Benz, k5, Audi, BMW';
      cy.setName(cars);
      cy.setTrialCount(10);
      cy.get('.game-result').should('not.have.class', 'hide');

      const carNames = cars.split(',').map(car => car.trim());
      cy.get('.car-player').each(($el, idx) => {
        const text = $el.text();
        expect(text).be.equal(carNames[idx]);
      });
    });
  });
});
