describe('js-racingcar', () => {
  beforeEach(() => {
    //페이지 접속
    cy.visit('/index.html');
  })

  describe('자동차에 이름을 부여한다.', () => {
    it('쉼표로 구분된 5자 이하의 이름들을 입력하면 시도횟수 입력창이 나타난다.', () => {
      const carNames = 'one, two, three, four';
      cy.get('#input-cars-name')
        .type(carNames);

      cy.get('#submit-cars-name')
        .click();

      cy.get('#attempt-number-container')
        .should('be.visible');
    })

    it('정상적인 이름을 입력했을때 이름 입력과 확인 버튼이 비활성화 된다.', () => {
      const carNames = 'one, two, three, four';

      cy.get('#input-cars-name')
        .type(carNames)
        .then(() => {
          cy.get('#submit-cars-name')
            .click()
            .should('be.disabled');
        })
        .should('be.disabled');
    })

    it('길이가 0인 이름을 입력하면 에러메세지가 나타난다.', () => {
      const carNames = '    , a, aa, aaa';

      cy.get('#input-cars-name')
        .type(carNames);
      
      const stub = cy.stub();

      cy.on('window:alert', stub) 

      cy.get('#submit-cars-name')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다.')
        })
    })

    it('길이가 6이상인 이름을 입력하면 에러메세지가 나타난다.', () => {
      const carNames ='aaaaaa, aaa, aa, a';

      cy.get('#input-cars-name')
        .type(carNames);
      
      const stub = cy.stub();

      cy.on('window:alert', stub) 

      cy.get('#submit-cars-name')
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다.')
        })
    })


  })
})



