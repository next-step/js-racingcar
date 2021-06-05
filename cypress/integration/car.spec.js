import Racing from '../../src/js/components/Racing';

const ROUND = 3;
const NAMES = ['EAST','WEST','SOUTH','NORTH'];

describe('자동차는 전진 또는 멈출 수 있다.', () => {
  beforeEach(function () {
    cy.visit('/')
    cy.document().then((doc) => {
      const racing = new Racing(doc.querySelector("#app"));
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
    })
  });
  
  it('4 이상이면 전진한다.', () => {
    cy.get('@EAST')
      .invoke('goRound', 4);
    cy.get('.racing-track')
      .contains('EAST')
      .parent()
      .contains('⬇️️')
  });

  it('3 이하면 정지한다.', () => {
    cy.get('@WEST')
      .invoke('goRound', 3);
    cy.get('.racing-track')
      .contains('WEST')
      .parent()
      .find('.spinner')
  });

  it('게임이 끝나면 우승자가 보여야한다. 만약 우승자가 여러명일 경우 , 를 이용해서 구분한다.', () => {
    cy.get('@racing').invoke('getResultPane').then((resultPane) => {
      cy.get('@gameProcess')
        .invoke('start', ROUND, resultPane.showWinner)
      cy.wait(1000 * ROUND + 2000);
      cy.get('@racingCars').invoke('getWinner').then((winners) => {
        cy.get('.result-pane').contains(`🏆 최종 우승자: ${winners.join(', ')}🏆`)
      })
    })
  });
})
