import { SELECTOR } from '../../src/js/constants/selector.js';

describe('게임 결과 테스트', () => {
  const TYPE = {
    CAR_NAMES: '가,나,다',
    TRIAL_COUNT: 6,
  };

  before(() => {
    cy.clock();
    cy.visit('../../index.html');
    cy.registerNamesByButton(TYPE.CAR_NAMES);
    cy.registerCountByButton(TYPE.TRIAL_COUNT);
  });

  it('게임이 끝났으면 우승자가 화면에 보인다.', () => {
    cy.clock();
    cy.runAllTurns(TYPE.TRIAL_COUNT);
    cy.get(SELECTOR.WINNERS).should('exist').and('be.visible');
  });

  it('게임이 끝났으면 다시 시작하기 버튼이 화면에 보인다.', () => {
    cy.clock();
    cy.runAllTurns(TYPE.TRIAL_COUNT);
    cy.get(SELECTOR.RESTART_GAME_BTN).should('exist').and('be.visible');
  });
});
