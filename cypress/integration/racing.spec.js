Cypress.Commands.add('carNamesInput', () => cy.get('#car-names-input'));

Cypress.Commands.add('carNamesSubmit', () => cy.get('#car-names-submit'));

Cypress.Commands.add('cycleInput', () => cy.get('#racing-cycle-input'));

Cypress.Commands.add('cycleSubmit', () => cy.get('#racing-cycle-submit'));

Cypress.Commands.add('racingCars', () => cy.get('div.mr-2'));

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
    it('자동차 이름을 입력을 통과하기전 횟수 입력 화면이 보이지 않는다.', () => {
      cy.cycleInput().should('not.be.visible');
      cy.cycleSubmit().should('not.be.visible');
    });
    it('초기에 자동차들은 보이지 않는다.', () => {
      cy.racingCars().should('not.exist');
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
      cy.carNamesInput().type('3글자,4글자아,5글자아아');
      cy.carNamesSubmit()
        .click()
        .then(() => {
          cy.carNamesInput().should('be.disabled');
          cy.carNamesSubmit().should('be.disabled');
          cy.cycleInput().should('be.visible');
          cy.cycleSubmit().should('be.visible');
        });
    });
  });

  describe('시도 횟수 입력 화면 테스트', () => {
    beforeEach(() => {
      cy.carNamesInput().type('자동,자동차');
      cy.carNamesSubmit().click();
    });

    it('횟수를 입력하지 않고 확인을 누르는 경우 경고창이 뜬다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.cycleSubmit()
        .click()
        .then(() => {
          expect(alertStub).to.be.called;
        });
    });

    it('횟수는 숫자만 입력된다', () => {
      cy.cycleInput().type('aet');
      cy.cycleInput().should('have.value', '');

      cy.cycleInput().type('한글');
      cy.cycleInput().should('have.value', '');

      cy.cycleInput().type(31);
      cy.cycleInput().should('have.value', 31);
    });

    it('횟수는 1에서 100을 벗어난 경우 경고창이 뜬다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.cycleInput().type(-12);
      cy.cycleSubmit()
        .click()
        .then(() => {
          expect(alertStub).to.be.called;
        });

      cy.cycleInput().clear();
      cy.cycleInput().type(101);
      cy.cycleSubmit()
        .click()
        .then(() => {
          expect(alertStub).to.be.called;
        });
    });

    it('정상적으로 입력된 경우 ', () => {
      cy.cycleInput().type(22);
      cy.cycleSubmit()
        .click()
        .then(() => {
          cy.cycleInput().should('be.disabled');
          cy.cycleSubmit().should('be.disabled');
        });
    });
  });

  describe('경기 시작', () => {
    beforeEach(() => {
      cy.carNamesInput().type('자동1,자동차2,자동3');
      cy.carNamesSubmit().click();
      cy.cycleInput().type(5);
      cy.cycleSubmit().click();
    });

    it('경기 시작 후 입력된 수만큼 자동차가 표시된다.', () => {
      cy.racingCars().should('be.visible');
      cy.get('.car-player').should('have.length', 3);
    });
  });
});
