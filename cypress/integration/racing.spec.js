import { maxValueIndexes } from '../../src/js/components/RacingCars';

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

const tickEverySecondUntilRacingEnd = (round) => {
  [...Array(ROUND).keys()].map(() => {
    cy.tick(1000);
  });
};

describe('(정상적인 입력으로)레이싱 진행 테스트', () => {
  context(
    'Cypress clock옵션을 켜두고 tick으로 게임 진행을 1초마다 관찰 또는 스킵하는 상태',
    () => {
      beforeEach(() => {
        cy.visit('/');
        cy.clock();
        startRacing();
        cy.getBySel('car-track').as('track');
      });

      it('자동차 경주 게임의 턴이 진행 될 때마다 1초의 텀(progressive)를 두고 진행한다.', () => {
        [...Array(ROUND).keys()].map((i) => {
          // NOTE: before에는 모든 자동차의 맨 뒤가 스피너야 한다.
          cy.get('@track').each(($track) => {
            const $spinner = $track.children().last()[0];
            expect($spinner).to.have.class('spinner-box');
          });
          // NOTE: 1초 스킵
          cy.tick(1000);
          // NOTE: after에도 로딩스피너가 있어야함. 단 마지막 라운드에서는 없어야함
          cy.get('@track').each(($track) => {
            const $spinner = $track.children().last()[0];
            if (i + 1 === ROUND) {
              expect($spinner).not.to.have.class('spinner-box');
            } else {
              expect($spinner).to.have.class('spinner-box');
            }
          });
        });
      });

      it('게임이 끝나면 우승자가 보여야한다. 만약 우승자가 여러명일 경우 , 를 이용해서 구분한다.', () => {
        tickEverySecondUntilRacingEnd(ROUND);
        const distances = [];
        cy.get('.racing-track')
          .children()
          .each((track) => {
            distances.push(track.children().length);
          });
        cy.wrap(distances).then((distances) => {
          const winnersIndex = maxValueIndexes(distances);
          const winners = NAMES.filter((_, i) => winnersIndex.includes(i));
          cy.get('.result-pane').contains(
            `🏆 최종 우승자: ${winners.join(', ')}🏆`
          );
        });
      });

      it('정상적으로 게임의 턴이 다 동작된 후에는 결과를 보여주고 2초 후에 축하의 alert 메세지를 띄운다.', () => {
        cy.window().then((window) => cy.stub(window, 'alert').as('alert'));
        cy.get('@alert').should('not.be.called');
        tickEverySecondUntilRacingEnd(ROUND);
        cy.tick(2000);
        cy.get('@alert').should('be.calledWith', '축하합니다');
      });

      it('다시시작하기 버튼을 누르면 게임이 다시 시작된다.', () => {
        // NOTE: 이미 시작된 게임이 끝나기를 기다림
        tickEverySecondUntilRacingEnd(ROUND);
        cy.tick(2000);
        cy.clickTarget('.result-pane__btn');
        startRacing();
        tickEverySecondUntilRacingEnd(ROUND);
        cy.tick(2000);
        cy.get('.result-pane').should('have.not.class', 'hidden');
      });
    }
  );
});
