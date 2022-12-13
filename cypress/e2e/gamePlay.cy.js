import { INPUT_CONDITION } from '../../src/js/constants/condition.js';

describe('게임 플레이 테스트', () => {
  const TYPE = {
    CAR_NAMES: '가,나,다',
    TRIAL_COUNT: 6,
  };

  before(() => {
    cy.visit('../../index.html');
    cy.registerNamesByButton(TYPE.CAR_NAMES);
    cy.registerCountByButton(TYPE.TRIAL_COUNT);
  });

  it('이름과 게임 횟수를 입력 완료한 후 자동차 이름을 화면에 표시한다.', () => {
    const carNamesToArray = TYPE.CAR_NAMES.split(INPUT_CONDITION.SEPARATOR_CAR_NAME).map((name) =>
      name.trim()
    );

    cy.get('.car-player').each(($ele, idx) => {
      cy.get($ele).should('be.visible');
      cy.get($ele).should('contain', carNamesToArray[idx]);
    });
  });
});
