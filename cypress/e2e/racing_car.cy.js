beforeEach(() => {
  cy.visit('/');
});

describe('자동차 경주 게임 초기화', () => {
  it('자동차 이름을 입력할 수 있는 필드만 보인다.', () => {
    cy.get('#form-car-name').should('be.visible');
    cy.get('#form-try-count, #car-racing, #result-winner').should('not.be.visible');
  })
})