import Racing from '../../src/js/components/Racing';
const NAMES = ['EAST', 'WEST', 'SOUTH', 'NORTH'];
const ROUND = 3;

const startRacing = () => {
  cy.getBySel('car-names-input').as('nameInput');
  cy.getBySel('car-names-btn').as('nameBtn');
  cy.getBySel('try-number-input').as('tryNumInput');
  cy.getBySel('try-number-btn').as('tryNumBtn');
  cy.typeToTarget('@nameInput', NAMES.join(',')).clickTarget('@nameBtn');
  cy.typeToTarget('@tryNumInput', ROUND).clickTarget('@tryNumBtn');
};

describe('레이싱 진행 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  context('Racing 컴포넌트를 인위적으로 만들고 테스트합니다.', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.document().then((doc) => {
        const racing = new Racing(doc.querySelector('#app'));
        const gameProcess = racing.getGameProcess();
        gameProcess.setTrack(doc.querySelector('#racing-track'));
        const resultPane = racing.getResultPane();
        resultPane.setPane(doc.querySelector('.result-pane'));
        gameProcess.ready(NAMES);
        const racingCars = gameProcess.getRacingCars();
        cy.wrap(racing).as('racing');
        cy.wrap(gameProcess).as('gameProcess');
        cy.wrap(racingCars).as('racingCars');
        cy.wrap(racingCars.cars[0]).as(NAMES[0]);
        cy.wrap(racingCars.cars[1]).as(NAMES[1]);
        cy.wrap(racingCars.cars[2]).as(NAMES[2]);
        cy.wrap(racingCars.cars[3]).as(NAMES[3]);
      });
    });

    it('랜덤값이 4 이상이면 전진한다.', () => {
      cy.get('@EAST').invoke('goRound', 4);
      cy.get('.racing-track').contains('EAST').parent().contains('⬇️️');
    });

    it('랜덤값이 3 이하면 정지한다.', () => {
      cy.get('@WEST').invoke('goRound', 3);
      cy.get('.racing-track').contains('WEST').parent().find('.spinner');
    });

    it('게임이 끝나면 우승자가 보여야한다. 만약 우승자가 여러명일 경우 , 를 이용해서 구분한다.', () => {
      cy.get('@racing')
        .invoke('getResultPane')
        .then((resultPane) => {
          cy.get('@gameProcess').invoke('start', ROUND, resultPane.showWinner);
          cy.wait(1000 * ROUND + 2000);
          cy.get('@racingCars')
            .invoke('getWinner')
            .then((winners) => {
              cy.get('.result-pane').contains(
                `🏆 최종 우승자: ${winners.join(', ')}🏆`
              );
            });
        });
    });
  });

  context('게임이 시작되었습니다.', () => {
    beforeEach(() => {
      startRacing();
    });

    it('자동차에 이름을 부여할 수 있다.', () => {
      NAMES.forEach((carName, i) => {
        cy.get('.racing-track').find(`[data-car="${i}"]`).contains(carName);
      });
    });

    it('정상적으로 게임의 턴이 다 동작된 후에는 결과를 보여주고 2초 후에 축하의 alert 메세지를 띄운다.', () => {
      cy.window().then((window) => cy.stub(window, 'alert').as('alert'));
      cy.get('@alert').should('not.be.called');
      cy.wait(1000 * ROUND + 2000);
      cy.get('@alert').should('be.calledWith', '축하합니다');
    });

    it('다시시작하기 버튼을 누르면 게임이 다시 시작된다.', () => {
      // NOTE: 이미 시작된 게임이 끝나기를 기다림
      cy.wait(1000 * ROUND + 2000);
      cy.clickTarget('.result-pane__btn');
      startRacing();
      cy.get('.result-pane').should('have.not.class', 'hidden');
    });
    // TODO: 구현 못함
    it('자동차 경주 게임의 턴이 진행 될 때마다 1초의 텀(progressive)를 두고 진행한다.', () => {});
  });
});
