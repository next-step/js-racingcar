import { ALERT_MESSAGES } from "../../src/constants/alertMessages.js";

describe('자동차 경주 게임', () => {
  context('자동차 이름은 쉼표를 기준으로 구분하여 입력할 수 있다.', () => {
    before(() => {
      cy.visit('index.html');
    });

    it('자동차 이름이 쉼표로 끝나도록 입력한다.', () => {
      cy.getCarNameInput().type('EAST, WEST, SOUTH, NORTH,');
      cy.alertCarNamesInput();
    });

    it('자동차 이름 길이가 1 미만인 이름을 입력한다.', () => {
      cy.getCarNameInput().clear();
      cy.getCarNameInput().type('EAST, , SOUTH, NORTH');
      cy.alertCarNamesInput();
    });

    it('자동차 이름 길이가 5 초과인 이름을 입력한다.', () => {
      cy.getCarNameInput().clear();
      cy.getCarNameInput().type('EAST, WEST, SOUTH, NORTHHHHHHHH');
      cy.alertCarNamesInput();
    });

    it('길이가 모두 1 ~ 5 사이인 자동차 이름을 입력한다.', () => {
      cy.getCarNameInput().clear();
      cy.enrollCorrectCarName('EAST, WEST, SOUTH, NORTH');
      cy.getInputRaceTimesSection().should('be.visible');
    });
  });

  context('사용자는 몇 번의 이동을 할 것인지를 입력할 수 있다.', () => {
    before(() => {
      cy.visit('index.html');
    });

    it('자동차 이름을 정상적으로 입력한다.', () => {
      cy.enrollCorrectCarName('EAST, WEST, SOUTH, NORTH');
      cy.getInputRaceTimesSection().should('be.visible');
    });

    it('자동차 경주 시도 횟수를 1 미만으로 입력한다.', () => {
      cy.getRaceTimesInput().type(-1);
      cy.alertRaceTimesInput();
    });

    it('1 이상의 자동차 경주 시도 횟수를 입력한다.', () => {
      cy.getRaceTimesInput().clear();
      cy.enrollCorrectRaceTimes(1);
      cy.getCarsContainer().should('be.visible');
    });
  });

  context('자동차 경주가 완료된 후에 축하의 메시지를 보여준다.', () => {
    before(() => {
      cy.visit('index.html');
    });

    const raceTimes = 5;
    it('자동차 이름을 정상적으로 입력한다.', () => {
      cy.enrollCorrectCarName('EAST, WEST, SOUTH, NORTH');
    });

    it('자동차 경주 횟수를 입력한다.', () => {
      cy.enrollCorrectRaceTimes(raceTimes);
    });

    it('입력한 경주 횟수만큼 진행 후에 우승자를 확인한다.', () => {
      // cy.clock();
      cy.wait(raceTimes * 1000);
      cy.getGameResultContainer().should('be.visible');
    });

    it('2초 뒤에 축하 메시지가 보여야한다.', () => {
      cy.clock();
      cy.tick(2000);
      cy.on('window:alert', (str) => {
        expect(str).to.equal(ALERT_MESSAGES.CONGRATULATION);
      });
    });
  });
});
