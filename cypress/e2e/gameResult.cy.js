import { GAME_CONDITION } from '../../src/js/constants/condition.js';
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
    cy.get(SELECTOR.RESTART_GAME_BTN).should('exist').and('be.visible');
  });

  it('게임이 끝났으면 2초 후 축하 메세지 alert 창이 뜬다.', () => {
    cy.clock();
    cy.tick(GAME_CONDITION.CELEBRATE_TIME);
    cy.on('window:alert', (text) => {
      expect(text).to.contains('축하합니다!');
    });
  });

  context('다시 시작하기 버튼을 클릭하면', () => {
    it('자동차 이름은 초기화된다.', () => {
      cy.get(SELECTOR.RESTART_GAME_BTN).click();
      cy.get(SELECTOR.TRIAL_COUNT_INPUT).should('have.value', '');
    });
    it('시도 횟수는 초기화된다.', () => {
      cy.get(SELECTOR.TRIAL_COUNT_INPUT).should('have.value', '');
    });
    it('자동차 이름 form만 화면에 보인다.', () => {
      cy.get(SELECTOR.CAR_NAMES_FORM).should('be.visible');

      cy.get(SELECTOR.TRIAL_COUNT_FORM).should('not.be.visible');
      cy.get(SELECTOR.PLAY_GAME).should('not.be.visible');
      cy.get(SELECTOR.GAME_RESULT).should('not.be.visible');
    });
  });
});
