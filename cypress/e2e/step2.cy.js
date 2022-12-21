const resultSelector = '.race-result-component';
const spinnerSelector = '.spinner';

const carNameSelector = '.car-name';
const carNameButtonSelector = '.car-name-submit-btn';
const trialNumberSelector = '.trial-number';
const trialNumberButtonSelector = '.trial-number-submit-btn';

const TRIAL_TIMES = 3;
const MILLISECONDS = 1000;
const WINNER_MESSAGE = '🎇🎇🎇🎇축하합니다!🎇🎇🎇🎇';
const WINNER_MESSAGE_TIME = 2000;

describe('자동차 경주 결과를 표시한다', () => {
  beforeEach(() => {
    cy.clock();
    cy.visit('/');
    cy.get(carNameSelector).type('Car1,Car2,Car3,Car4');
    cy.get(carNameButtonSelector).click();
    cy.get(trialNumberSelector).type(`${TRIAL_TIMES}`);
    cy.get(trialNumberButtonSelector).click();
    cy.tick(TRIAL_TIMES * MILLISECONDS);
  });
  it('경주가 끝나면, 최종 우승자가 출력된다', () => {
    cy.get(resultSelector).should('have.exist');
  });

  it('경주가 끝나면, Spinner가 사라진다', () => {
    cy.get(spinnerSelector).should('have.not.exist');
  });
  it('2초 뒤에 축하 메시지가 뜬다', () => {
    cy.tick(WINNER_MESSAGE_TIME);
    cy.on('window:alert', (message) => {
      expect(message).to.equal(WINNER_MESSAGE);
    });
  });
});
