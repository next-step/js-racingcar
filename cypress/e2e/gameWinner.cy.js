describe('게임 우승자 확인 테스트', () => {
  const TYPE = {
    CAR_NAMES: '가,나,다,라',
    TRIAL_COUNT: 10,
  };

  before(() => {
    cy.visit('../../index.html');
    cy.registerNamesByButton(TYPE.CAR_NAMES);
    cy.registerCountByButton(TYPE.TRIAL_COUNT);
  });

  it('게임 완료 후 우승자를 화면에 표시한다.', () => {
    cy.get('.game-winners').should('exist').and('be.visible');
  });
});
