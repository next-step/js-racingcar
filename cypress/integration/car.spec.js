import Racing from '../../src/js/components/Racing';

const NAMES = ['EAST', 'WEST', 'SOUTH', 'NORTH'];

describe('레이싱 자동차의 전진 또는 멈춤 테스트', () => {
  context(
    '레이싱 게임 실행에 필요한 컴포넌트들을 인위적으로 생성한 상태',
    () => {
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

      it('랜덤값이 4 이상이면 car는 전진한다.', () => {
        cy.get('@EAST').invoke('goRound', 4);
        cy.get('.racing-track').contains('EAST').parent().contains('⬇️️');
      });

      it('랜덤값이 3 이하면 car는 정지한다.', () => {
        cy.get('@WEST').invoke('goRound', 3);
        cy.get('.racing-track').contains('WEST').parent().find('.spinner');
      });
    }
  );
});
