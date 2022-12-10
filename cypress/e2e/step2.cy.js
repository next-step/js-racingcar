const resultSelector = '.race-result-component';
const spinnerSelector = '.spinner';

const carNameSelector = '.car-name';
const carNameButtonSelector = '.car-name-submit-btn';
const trialNumberSelector = '.trial-number';
const trialNumberButtonSelector = '.trial-number-submit-btn';

describe('자동차 경주 결과를 표시한다', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get(carNameSelector).type('Car1,Car2,Car3,Car4');
    cy.get(carNameButtonSelector).click();
    cy.get(trialNumberSelector).type('3');
    cy.get(trialNumberButtonSelector).click();
  });
  it('경주가 끝나면, 최종 우승자가 출력된다', () => {
    cy.get(resultSelector).should('have.exist');
  });

  it('경주가 끝나면, Spinner가 사라진다', () => {
    cy.get(spinnerSelector).should('have.not.exist');
  });
  it('우승자가 여러명일 경우 ,를 이용해 구분한다', () => {});
});
