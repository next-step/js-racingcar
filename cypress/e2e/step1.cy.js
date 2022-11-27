const carNameSelector = '.car-name';
const carNameButtonSelector = '.car-name-submit-btn';
const trialNumberSelector = '.trial-number';
const trialNumberButtonSelector = '.trial-number-submit-btn';

const carPlayerSelector = '.car-player';
const forwardIconSelector = '.forward-icon';
const spinnerSelector = '.spinner';

const ERROR_MESSAGE = {
  LENGTH:
    '유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다.',
};

describe('자동차 경주 게임을 실행한다', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  // 자동차에 이름을 부여할 수 있다.
  // 전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.
  it('자동차의 이름을 입력할 수 있는 input이 있다', () => {
    cy.get(carNameSelector).should('have.exist');
  });
  it('자동차의 이름을 입력하지 않으면 alert 창이 뜬다', () => {
    cy.get(carNameButtonSelector)
      .click()
      .then(() => {
        cy.alertMessage(ERROR_MESSAGE.LENGTH);
      });
  });
  it('자동차의 이름은 5자 이하로 입력하지 않으면 alert 창이 뜬다', () => {
    cy.get(carNameSelector).type('Car111');
    cy.get(carNameButtonSelector)
      .click()
      .then(() => {
        cy.alertMessage(ERROR_MESSAGE.LENGTH);
      });
  });
  it('자동차의 이름 중 유효하지 않은 길이의 이름을 입력하면 alert 창이 뜬다', () => {
    cy.get(carNameSelector).type('Car1,Car2,,');
    cy.get(carNameButtonSelector)
      .click()
      .then(() => {
        cy.alertMessage(ERROR_MESSAGE.LENGTH);
      });
  });
  it('자동차의 이름이 모두 유효하면 시도 횟수를 입력할 수 있는 input이 나타난다', () => {
    cy.get(carNameSelector).type('Car1,Car2,Car3,Car4');
    cy.get(carNameButtonSelector)
      .click()
      .then(() => {
        cy.get(trialNumberSelector).should('exist');
      });
  });
  it('시도할 횟수를 입력할 input이 있다', () => {
    cy.get(trialNumberSelector).should('exist');
  });
  it('시도할 횟수는 숫자만 입력 가능하다', () => {
    cy.get(trialNumberSelector).type('ABC1');
    cy.get(trialNumberSelector).should('have.value', '1');
  });
  it('시도할 횟수를 입력하고 확인 버튼을 클릭하면, 자동차 이름이 표시된다', () => {
    cy.get(carNameSelector).type('Car1,Car2,Car3,Car4');
    cy.get(trialNumberSelector).type('3');

    cy.get(carPlayerSelector).should('have.length', '4');
    cy.get(carPlayerSelector).eq(0).should('contain', 'Car1');
    cy.get(carPlayerSelector).eq(1).should('contain', 'Car2');
    cy.get(carPlayerSelector).eq(2).should('contain', 'Car3');
    cy.get(carPlayerSelector).eq(3).should('contain', 'Car4');
  });

  it('전진한 자동차는 화살표가 표시된다', () => {
    cy.get(carNameSelector).type('Car1,Car2,Car3,Car4');
    cy.get(trialNumberSelector).type('3');

    cy.get(forwardIconSelector).should('exist');
  });
  it('멈춘 자동차는 스피너가 표시된다', () => {
    cy.get(carNameSelector).type('Car1,Car2,Car3,Car4');
    cy.get(trialNumberSelector).type('3');

    cy.get(spinnerSelector).should('exist');
  });
});
