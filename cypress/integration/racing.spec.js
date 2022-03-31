Cypress.Commands.add('carNameInput', () =>
  cy.get('div.d-flex > input[type=text]')
);

Cypress.Commands.add('tryNumberInput', () =>
  cy.get('div.d-flex > input[type=number]')
);

Cypress.Commands.add('racingScetion', () => cy.get('#racing'));

Cypress.Commands.add('racingResult', () => cy.get('#result'));

Cypress.Commands.add('isInitialCarName', () =>
  cy.carNameInput().should('have.value', '')
);

Cypress.Commands.add('isInitialTryNumber', () =>
  cy.tryNumberInput().should('have.value', '')
);

describe('자동차 경주 게임', () => {
  beforeEach(() => {
    cy.visit('../../index.html');
  });

  describe('초기 화면 테스트', () => {
    it('초기에 자동차 이름을 입력할 수 있는 form이 나온다.', () => {
      cy.get('form').should('be.visible');
    });
    it('초기에 횟수를 입력할 수 있는 input은 보이지 않는다.', () => {
      cy.tryNumberInput().should('not.exist');
    });
    it('초기에 경기가 진행되는 현황은 보이지 않는다.', () => {
      cy.racingScetion().should('not.exist');
    });
    it('초기에 경기의 우승 결과는 보이지 않는다.', () => {
      cy.racingResult().should('not.exist');
    });
  });
});
