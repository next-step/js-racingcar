import { ERROR_MESSAGES } from '/src/js/utils/constants.js';

const setName = name => {
  cy.get('.car-name-input').type(name, { force: true });
  cy.get('.car-name-submit-btn').click();
};

const setTrialCount = count => {
  cy.get('.trial-input').type(count, { force: true });
  cy.get('.trial-submit-btn').click();
};

const isAlert = message => {
  cy.on('window:alert', str => {
    expect(str).to.equal(message);
  });
};

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
      cy.get('.car-name-submit-btn').click();
      isAlert(ERROR_MESSAGES.NAME_OUT_OF_RANGE);
      setName('Mercedes-Benz');
      isAlert(ERROR_MESSAGES.NAME_OUT_OF_RANGE);
    });
  });

  describe('사용자는 몇번을 이동할 것인지 입력할 수 있다.', () => {
    beforeEach(() => {
      setName('Benz');
    });

    it('올바른 자동차 이름을 입력하면 시도할 횟수를 입력할 수 있다.', () => {
      cy.get('.trial-container').should('exist');
      cy.get('.trial-input').type('3');
      cy.get('.trial-submit-btn').click();
    });

    it('시도할 횟수를 입력할 수 있다.', () => {
      cy.get('.trial-container').should('exist');
    });

    it('시도할 횟수는 1 이상이어야 한다.', () => {
      cy.get('.trial-input').type('0', { force: true });
      cy.get('.trial-submit-btn').click();
      isAlert(ERROR_MESSAGES.INVALID_TRIAL_COUNT);
      cy.get('.trial-input').type('-100', { force: true });
      cy.get('.trial-submit-btn').click();
      isAlert(ERROR_MESSAGES.INVALID_TRIAL_COUNT);
    });

    it('시도할 횟수는 숫자만 입력되어야 한다.', () => {
      cy.get('.trial-input').type('abc뛟쒧10!@#');
      cy.get('.trial-input').should('have.value', '10');
    });
  });

  describe('주어진 횟수 동안 n대의 자동차는 전진 또는 멈출 수 있다.', () => {
    beforeEach(() => {
      setName('Benz, Casper, Torres, BMW');
      setTrialCount(10);
    });

    it('시도할 횟수를 입력하면, 입력한 이름이 화면에 표출된다.', () => {
      cy.get('.game-board').should('not.have.class', 'hide');
      // cy.get('.car-player'). 배열 비교
    });
  });
});
