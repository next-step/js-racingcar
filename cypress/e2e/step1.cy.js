describe('자동차 경주 게임 step1 ', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const getCarNamesInput = () => cy.get('#carNamesInput');
  const getCarNamesSubmit = () => cy.get('#carNamesSubmit');
  describe('자동차에 이름을 부여할 수 있다.', () => {
    it('자동차 이름을 입력할 input이 존재한다.', () => {
      getCarNamesInput().should('exist');
      getCarNamesInput().should('be.visible');
    });
    it('자동차에 부여한 이름을 제출할 버튼이 존재한다.', () => {
      getCarNamesSubmit().should('exist');
      getCarNamesSubmit().should('be.visible');
    });
  });
});
