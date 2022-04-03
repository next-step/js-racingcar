Cypress.Commands.add('carNamesInput', () => cy.get('#car-names-input'));

Cypress.Commands.add('carNamesSubmit', () => cy.get('#car-names-submit'));

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
    it('자동차 이름 입력이 가능한 화면이 보인다.', () => {
      cy.carNamesInput().should('be.visible');
      cy.carNamesSubmit().should('be.visible');
    });
    it('초기에 경기가 진행되는 현황은 보이지 않는다.', () => {
      cy.racingScetion().should('not.exist');
    });
    it('초기에 경기의 우승 결과는 보이지 않는다.', () => {
      cy.racingResult().should('not.exist');
    });
  });

  describe('자동차 입력 화면 테스트', () => {
    it('자동차 이름을 입력하지 않고 확인을 누르는 경우 경고창이 뜬다', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.carNamesInput().clear();
      cy.carNamesSubmit()
        .click()
        .then(() => {
          expect(alertStub).to.be.called;
        });
    });

    it('자동차 이름을 5자 초과해서 입력한 경우 경고창이 뜬다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.carNamesInput().type('6글자자동차');
      cy.carNamesSubmit()
        .click()
        .then(() => {
          expect(alertStub).to.be.called;
        });
    });

    it('콤마를 이용하여 구분하여 입력할 때 온전히 입력되지 않는 경우 경고창이 뜬다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.carNamesInput().type(',자동차');
      cy.carNamesSubmit()
        .click()
        .then(() => {
          expect(alertStub).to.be.called;
        });
    });

    it('정상적으로 입력된 경우 ', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.carNamesInput().type('자동,자동차');
      cy.carNamesSubmit()
        .click()
        .then(() => {
          cy.carNamesInput().should('be.disabled');
          cy.carNamesSubmit().should('be.disabled');
        });
    });
  });
});
