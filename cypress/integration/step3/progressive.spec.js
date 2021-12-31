describe('Step3', () => {
  const tryAmount = 3;
  before(() => {
    cy.visit('index.html');
  });

  it('자동차 경주 게임의 턴이 진행 될 때마다 1초의 텀(progressive 재생)을 두고 진행한다.', () => {
    const namesString = new Array(10).fill().map((ele, i) => i+1).join(',');
    cy.get('#winners').should('not.exist');
    cy.startRacing(namesString, tryAmount);
    const racingTime = 1000 * tryAmount;
    cy.wait(racingTime);
    cy.get('#winners').should('be.visible');
  });

});