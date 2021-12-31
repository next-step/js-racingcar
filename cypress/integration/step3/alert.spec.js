describe('테스트코드 격리', () => {

  const tryAmount = 3;

  before(() => {
    cy.visit('index.html');
  });

  it('정상적으로 게임의 턴이 다 동작된 후에는 결과를 보여주고, 2초 후에 축하의 alert 메세지를 띄운다.', () => {
    const namesString = new Array(10).fill().map((ele, i) => i + 1).join(',');
    cy.on('window:alert', cy.stub().as('alerted'));
    cy.get('@alerted').should('not.have.been.called');
    cy.startRacing(namesString, tryAmount);
    const racingTime = 1000 * tryAmount;
    const showResultDelay = 2000;
    cy.get('@alerted').should('not.have.been.called');
    cy.wait(racingTime);
    cy.get('@alerted').should('not.have.been.called');
    cy.wait(showResultDelay);
    cy.get('@alerted').should('have.been.calledOnce');
  });
});