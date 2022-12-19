import { INPUT_CONDITION } from '../../src/js/constants/condition.js';
import { SELECTOR } from '../../src/js/constants/selector.js';

describe('게임 플레이 테스트', () => {
  const INPUT = {
    CAR_NAMES: '가,나,다',
    TRIAL_COUNT: 6,
  };

  before(() => {
    cy.clock();
    cy.visit('../../index.html');
    cy.submitCarNames(INPUT.CAR_NAMES);
    cy.submitTrialCount(INPUT.TRIAL_COUNT);
  });

  context('이름과 시도 횟수를 입력 완료했을 때', () => {
    it('자동차 이름을 화면에 표시한다.', () => {
      const carNamesToArray = INPUT.CAR_NAMES.split(INPUT_CONDITION.SEPARATOR_CAR_NAME).map(
        (name) => name.trim()
      );

      cy.get(SELECTOR.CAR_NAME).each(($ele, idx) => {
        cy.get($ele).should('be.visible');
        cy.get($ele).should('contain', carNamesToArray[idx]);
      });
    });

    it('각 자동차의 전진 상황을 화면에 표시한다.', () => {
      cy.clock();
      cy.runAllTurns(INPUT.TRIAL_COUNT);
      cy.get(SELECTOR.PLAY_GAME).should('be.visible');
    });
  });
});
