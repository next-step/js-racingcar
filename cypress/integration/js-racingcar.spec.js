describe('js-racingcar', () => {
  beforeEach(() => {
    //페이지 접속
    cy.visit('/');
  })

  describe('자동차에 이름을 부여한다.', () => {
    it('쉼표로 구분된 5자 이하의 이름들을 입력하면 시도횟수 입력창이 나타난다.',() => {
      const carNames = ['one', 'two', 'three', 'four'];
      cy.get('#input-cars-name').type(carNames.join(','));

      cy.get('#submit-cars-name').click();

      cy.get('#trial-count-container').should('be.visible');
    })
  })

})



