describe('자동차 경주 게임', () => {
  beforeEach(() => {
    cy.visit('../index.html');
  });

  it('앱을 처음 접속하면 자동차 이름을 입력하는 화면만 보여야 한다.', () => {
    // given
    // when
    // then
    cy.get('#racing-try-count').should('not.be.visible');
    cy.get('#racing-track').should('not.be.visible');
    cy.get('#racing-result').should('not.be.visible');
  });

  it('자동차 이름을 입력하기 위한 input 과 button이 렌더링 되었는지 확인한다.', () => {
    cy.get('#car-names-input').should('be.visible');
    cy.get('#car-names-submit').should('be.visible');
  });

  it('자동차 이름을 입력하지 않으면 경고창 메시지를 보여준다.', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get('#car-names-input').clear();
    cy.get('#car-names-submit')
      .click()
      .then(() => {
        expect(alertStub).to.be.called;
      });
  });

  it('자동차 이름이 6글자 이상이면 경고창 메시지를 보여준다.', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get('#car-names-input').type('EVERYDAY');
    cy.get('#car-names-submit')
      .click()
      .then(() => {
        expect(alertStub).to.be.called;
      });
  });
});
