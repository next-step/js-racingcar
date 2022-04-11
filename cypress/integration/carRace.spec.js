import { ALERT_MESSAGES } from '../../src/constants/alertMessages.js';

describe('자동차 경주 게임', () => {
  context('자동차 이름 입력에 대한 테스트', () => {
    before(() => {
      cy.visit('index.html');
    });

    it('자동차 이름이 쉼표로 끝나도록 입력한다.', () => {
      cy.getCarNameInput().type('EAST, WEST, SOUTH, NORTH,');
      cy.alertCarNamesInput(ALERT_MESSAGES.INVALID_CAR_NAMES);
    });

    it('자동차 이름 길이가 1 미만인 이름을 입력한다.', () => {
      cy.getCarNameInput().clear();
      cy.getCarNameInput().type('EAST, , SOUTH, NORTH');
      cy.alertCarNamesInput(ALERT_MESSAGES.INVALID_CAR_NAMES);
    });

    it('자동차 이름 길이가 5 초과인 이름을 입력한다.', () => {
      cy.getCarNameInput().clear();
      cy.getCarNameInput().type('EAST, WEST, SOUTH, NORTHHHHHHHH');
      cy.alertCarNamesInput(ALERT_MESSAGES.INVALID_CAR_NAMES);
    });

    it('길이가 모두 1 ~ 5 사이인 자동차 이름을 입력한다.', () => {
      cy.getCarNameInput().clear();
      cy.enrollCorrectCarName('EAST, WEST, SOUTH, NORTH');
      cy.getInputRaceTimesSection().should('be.visible');
    });
  });

  context('자동차 경주 횟수 입력에 대한 테스트', () => {
    before(() => {
      cy.visit('index.html');
    });

    it('자동차 이름을 정상적으로 입력한다.', () => {
      cy.enrollCorrectCarName('EAST, WEST, SOUTH, NORTH');
      cy.getInputRaceTimesSection().should('be.visible');
    });

    it('자동차 경주 시도 횟수를 1 미만으로 입력한다.', () => {
      cy.getRaceTimesInput().type(-1);
      cy.alertRaceTimesInput(ALERT_MESSAGES.INVALID_RACE_TIEMS);
    });

    it('1 이상의 자동차 경주 시도 횟수를 입력한다.', () => {
      cy.getRaceTimesInput().clear();
      cy.enrollCorrectRaceTimes(1);
      cy.getCarsContainer().should('be.visible');
    });
  });

  context('자동차 경주 완료에 대한 테스트', () => {
    before(() => {
      cy.visit('index.html');
    });

    it('자동차 이름을 정상적으로 입력하고 제출한다.', () => {
      cy.enrollCorrectCarName('EAST, WEST, SOUTH, NORTH');
    });

    it('자동차 경주 횟수를 정상적으로 입력한다.', () => {
      cy.getRaceTimesInput().type(5);
    });

    it('자동차 경주가 끝나기 전에는 결과를 확인할 수 없다.', () => {
      cy.getGameResultContainer().should('not.be.visible');
    });

    it('매 턴 마다 경주 중임을 표시하는 화면이 보이고, 경주가 끝나면 사라진다.', () => {
      cy.clock();
      cy.getRaceTimesSubmitButton().click();
      cy.tick(1000);
      cy.getSpinners().should('be.visible');
      cy.tick(1000);
      cy.getSpinners().should('be.visible');
      cy.tick(3 * 1000);
      cy.getSpinners().should('not.exist');
    });

    it('경주가 끝나면 결과가 보여진다.', () => {
      cy.getGameResultContainer().should('be.visible');
    });
  });

  context('자동차 경주 완료 이후 축하 메시지에 대한 테스트', () => {
    before(() => {
      cy.visit('index.html');
    });

    it('자동차 이름을 정상적으로 제출한다.', () => {
      cy.enrollCorrectCarName('EAST, WEST, SOUTH, NORTH');
    });

    it('자동차 경주 횟수를 제출하고 게임이 완료된 후 2초 뒤에 축하메시지가 보여진다.', () => {
      cy.clock();

      cy.getGameResultContainer().should('not.be.visible');
      cy.enrollCorrectRaceTimes(5);
      cy.tick(5 * 1000);
      cy.getGameResultContainer().should('be.visible');

      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);
      cy.tick(2000).then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(ALERT_MESSAGES.CONGRATULATION);
      });
    });
  });

  context('자동차 경주 재시작 테스트', () => {
    before(() => {
      cy.visit('index.html');
    });

    it('첫 번째 자동차 경주를 완료한다.', () => {
      cy.clock();
      cy.enrollCorrectCarName('EAST, WEST, SOUTH, NORTH');
      cy.enrollCorrectRaceTimes(5).tick(5 * 1000);
      cy.getGameResetButton().should('be.disabled');

      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);
      cy.tick(2000).then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(ALERT_MESSAGES.CONGRATULATION);
      });

      cy.getGameResetButton().should('not.be.disabled').click();
    });

    it('두 번째 자동차 경주를 시작한다.', () => {
      cy.getInputRaceTimesSection().should('not.be.visible');
      cy.getCarsContainer().should('not.be.visible');
      cy.getGameResultContainer().should('not.be.visible');

      cy.getCarNameInput().should('be.empty');
      cy.getCarNameSubmitButton().should('not.be.disabled');
      cy.enrollCorrectCarName('EAST, WEST, SOUTH, NORTH');

      cy.clock();
      cy.getInputRaceTimesSection().should('be.visible');
      cy.getRaceTimesInput().should('be.empty');
      cy.getRaceTimesSubmitButton().should('not.be.disabled');
      cy.enrollCorrectRaceTimes(5);

      cy.getCarsContainer().should('be.visible');
      cy.getGameResultContainer().should('not.be.visible');
      cy.getCarsContainer().find('[data-cy="car"]').should('have.length', 4);

      cy.tick(5 * 1000);

      cy.getGameResultContainer().should('be.visible');
      cy.getGameResetButton().should('be.disabled');
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);
      cy.tick(2000).then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(ALERT_MESSAGES.CONGRATULATION);
      });
      cy.getGameResetButton().should('not.be.disabled');
    });
  });
});
