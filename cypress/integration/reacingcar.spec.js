describe('자동차 경주 게임', () => {
  beforeEach(() => {
    cy.visit('../../index.html');
  });

  it('자동차 이름을 입력하는 입력창과 확인 버튼이 존재한다.', () => {
    cy.get('#car-name-input').should('be.visible');
    cy.get('#car-name-submit').should('be.visible');
  });
});
