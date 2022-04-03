describe('자동차 경주 게임', () => {
  beforeEach(() => {
    cy.visit('../../index.html');
  });

  it('자동차 이름을 입력하는 입력창과 확인 버튼이 존재한다.', () => {
    cy.get('#car-name-input').should('be.visible');
    cy.get('#car-name-submit').should('be.visible');
  });

  it('자동차 이름으로 빈값을 입력하면 경고창이 출력된다.', () => {
    const alertStub = cy.stub();

    cy.on('window:alert', alertStub);

    cy.get('#car-name-input').clear();
    cy.get('#car-name-submit')
      .click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith('자동차 이름을 입력해주세요.');
      });
  });
});
