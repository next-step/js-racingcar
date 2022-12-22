import ERROR_MESSAGES from '/src/js/constant/errorMessages.js';
import { CONGRATS_MESSAGE } from '/src/js/constant/racingcar.js';

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

  describe('자동차 경주 게임을 시작한다.', () => {
    const cars = 'Benz, k5, Audi, BMW';

    beforeEach(() => {
      cy.setName(cars);
    });

    it('입력한 이름이 결과 화면에 표출된다.', () => {
      cy.setTrialCount(10);
      cy.get('.game-result').should('not.have.class', 'hide');

      const carNames = cars.split(',').map(car => car.trim());
      cy.get('.car-player').each(($el, idx) => {
        const text = $el.text();
        expect(text).be.equal(carNames[idx]);
      });
    });

    it('입력한 시도 횟수 내에서만 전진한다.', () => {
      const trialCounts = [5, 10, 15, 20, 50];

      cy.wrap(trialCounts).each(count => {
        cy.setTrialCount(count);

        cy.get('.result-container').each($el => {
          const length = $el.find('.forward-icon').length;
          expect(length).to.be.within(0, count);
        });

        cy.get('.trial-input').clear({ force: true });
        cy.get('.trial-submit-btn').invoke('removeAttr', 'disabled');
      });
    });

    it('경기 시작후 얼마나 전진했는지 결과가 보인다.', () => {
      cy.setTrialCount(4);
      cy.wait(4 * 1000);
      cy.get('.game-result').should('be.visible');
    });

    it('경기 종료후 2초뒤에 축하합니다 alert이 뜬다.', () => {
      cy.setTrialCount(4);
      cy.wait(4 * 1000);
      cy.wait(2000);
      cy.isAlert(CONGRATS_MESSAGE);
    });
  });

  describe('자동차 경주 게임을 리셋할 수 있다.', () => {
    beforeEach(() => {
      cy.setName('Benz, k5, Audi, BMW');
      cy.setTrialCount(4);
      cy.wait(4 * 1000);
    });

    it('다시 시작하기 버튼을 누르면 처음 화면으로 되돌아 간다.', () => {
      cy.get('.reset-btn').click();
      cy.get('.trial-form').should('have.class', 'hide');
      cy.get('.game-result').should('have.class', 'hide');
      cy.get('.winner-section').should('have.class', 'hide');

      cy.get('.car-name-input').should('not.be.disabled');
      cy.get('.car-name-submit-btn').should('not.be.disabled');
      cy.get('.trial-submit-btn').should('not.be.disabled');
      cy.get('.trial-input').should('not.be.disabled');

      cy.get('.car-name-input').should('have.text', '');
    });
  });
});
