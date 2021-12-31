describe('Step2', () => {
  const tryAmount = 3;
  before(() => {
    cy.visit('index.html');
    const namesString = new Array(10).fill().map((ele, i) => i+1).join(',');
    cy.startRacing(namesString, tryAmount);

    const racingTime = 1000 * tryAmount;
    const showResultDelay = 2000;
    cy.wait(racingTime);
    cy.wait(showResultDelay);
  });

  it('자동차 경주 게임을 완료한 후 누가 우승했는지를 알려준다.', () => {
    cy.get('#winner').should('be.visible');
    cy.get('#winner').should('not.be.empty');
  });
  it('우승자는 한 명 이상일 수 있다. 우승자가 여러명일 경우 ,를 이용하여 구분한다.', () => {

    cy.get('#winners').should(($winners) => {
      const winnersString = $winners.text();
      const winners = winnersString.split(',');
      expect(winners.length >= 0).to.be.true;
    });
      // document.querySelector().innerHTML.split(',');
  });
});

