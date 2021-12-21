/// <reference types="cypress" />

beforeEach(() => {
  cy.visit('http://localhost:1234');
});

const submitCarNames = (...carNames) => {
  cy.get('input[name="car-names"]').type(carNames.join(','));
  cy.get('#name-form').submit();
};

const submitTryAmount = (tryAmount) => {
  cy.get('input[name="try-amount"]').type(tryAmount);
  cy.get('#try-amount-form').submit();
};

describe('자동차 이름을 입력한다.', () => {
  it('정상 입력 시, 시도 횟수 입력 form이 나온다.', () => {
    submitCarNames('car1', 'car2');

    cy.get('my-try-amount-form').should('be.visible');
  });
});

describe('시도횟수를 입력한다.', () => {
  beforeEach(() => {
    submitCarNames('car1', 'car2');
  });

  it('정상 입력 시, 게임진행 view가 나온다.', () => {
    submitTryAmount(2);

    cy.get('my-game-progress').should('be.visible');
  });
});

describe('게임 결과를 확인한다.', () => {
  beforeEach(() => {
    submitCarNames('car1');
    submitTryAmount(1);
  });

  it('게임 결과를 확인한다.', () => {
    cy.get('#winner').should('have.text', 'car1');
  });
});

describe('게임을 다시 시작 버튼을 누른다.', () => {
  beforeEach(() => {
    submitCarNames('car1');
    submitTryAmount(1);
    cy.get('#game-reset').click();
  });

  it('시도횟수form, 게임진행 view, 게임결과 view가 사라진다.', () => {
    cy.get('my-game-progress').should('not.to.be.visible');
    cy.get('my-try-amount-form').should('not.to.be.visible');
    cy.get('my-game-result').should('not.to.be.visible');
  });

  it('처음부터 게임을 진행할 수 있다.', () => {
    submitCarNames('car2');
    submitTryAmount(2);

    cy.get('#winner').should('have.text', 'car2');
  });
});
