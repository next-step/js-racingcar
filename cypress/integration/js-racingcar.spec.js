import {
  INVALID_NAME_LENGTH_ERROR, 
  ATTEMPT_NUM_UNDER_MIN_ERROR 
} from '../../src/js/Constants/message.js';

describe('js-racingcar', () => {
  beforeEach(() => {
    //페이지 접속
    cy.visit('/');
  })

  describe('자동차에 이름을 부여한다.', () => {
    context('쉼표로 구분된 5자 이하의 이름들을 입력한다.', () => {
      beforeEach(() => {
        const carNames = 'one, two, three, four';

        cy.get('[data-cy="car-name-container"] input')
          .type(carNames)
      })

      it('확인버튼을 클릭히면 시도횟수 입력창이 나타난다.', () => {
      
        cy.get('[data-cy="car-name-container"] button')
          .click();
  
        cy.get('[data-cy="attempt-number-container"]')
          .should('be.visible');
      })
  
      it('Enter 키를 누르면 시도횟수 입력창이 나타난다.', () => {
      
        cy.get('[data-cy="car-name-container"] input')
          .type('{enter}');
        
        cy.get('[data-cy="attempt-number-container"]')
          .should('be.visible');
      })
  
      it('이름 입력과 확인 버튼이 비활성화 된다.', () => {
        const carNames = 'one, two, three, four';
  
        cy.get('[data-cy="car-name-container"] input')
          .then(() => {
            cy.get('[data-cy="car-name-container"] button')
              .click()
              .should('be.disabled');
          })
          .should('be.disabled');
      })
    })
    
    context('비정상적인 이름을 입력한다.', () => {
      it('길이가 0인 이름을 입력하면 에러메세지가 나타난다.', () => {
        const carNames = '    , a, aa, aaa';
  
        cy.get('[data-cy="car-name-container"] input')
          .type(carNames);
        
        const stub = cy.stub();
  
        cy.on('window:alert', stub) 
  
        cy.get('[data-cy="car-name-container"] button')
          .click()
          .then(() => {
            expect(stub.getCall(0)).to.be.calledWith(INVALID_NAME_LENGTH_ERROR)
          })
  
          cy.get('[data-cy="car-name-container"] input')
            .should('have.value', '');
      })
  
      it('길이가 6이상인 이름을 입력하면 에러메세지가 나타난다.', () => {
        const carNames ='aaaaaa, aaa, aa, a';
  
        cy.get('[data-cy="car-name-container"] input')
          .type(carNames);
        
        const stub = cy.stub();
  
        cy.on('window:alert', stub) 
  
        cy.get('[data-cy="car-name-container"] button')
          .click()
          .then(() => {
            expect(stub.getCall(0)).to.be.calledWith(INVALID_NAME_LENGTH_ERROR)
          })
        
        cy.get('[data-cy="car-name-container"] input')
          .should('have.value', '');  
      })
    })

  })

  describe('시도 횟수를 입력한다', () => {
    beforeEach(() => {
      const carNames = 'one, two, three, four';
      
      cy.get('[data-cy="car-name-container"] input')
        .type(carNames);

      cy.get('[data-cy="car-name-container"] button')
        .click();
    })

    context('1 이상의 숫자를 입력하면 자동차 경주 창이 나타난다.', () => {
      it ('숫자 1을 입력한다', () => {
        const attemptsNumber = '1';
    
        cy.get('[data-cy="attempt-number-container"] input')
          .type(attemptsNumber)
          .then(() => {
            cy.get('[data-cy="attempt-number-container"] button')
            .click()
            .then(() => {
              cy.get('.mt-4')
              .should('be.visible')  
            })
          })
      })

      it ('숫자 10을 입력한다', () => {
        const attemptsNumber = '10';
    
        cy.get('[data-cy="attempt-number-container"] input')
          .type(attemptsNumber)
          .then(() => {
            cy.get('[data-cy="attempt-number-container"] button')
            .click()
            .then(() => {
              cy.get('.mt-4')
              .should('be.visible')  
            })
          })
      })
    })
    
    context('0 이하의 숫자를 입력하면 에러메세지가 나타난다.', () => {
      it ('0을 입력한다.', () => {
        const attemptsNumber = '0';
        
        const stub = cy.stub();

        cy.on('window:alert', stub) 

        cy.get('[data-cy="attempt-number-container"] input')
          .type(attemptsNumber)
          .then(() => {
            cy.get('[data-cy="attempt-number-container"] button')
            .click()
            .then(() => {
              expect(stub.getCall(0)).to.be.calledWith(ATTEMPT_NUM_UNDER_MIN_ERROR)
            })
          })
      })

      it ('-3을 입력한다.', () => {
        const attemptsNumber = '-3';
        
        const stub = cy.stub();

        cy.on('window:alert', stub) 

        cy.get('[data-cy="attempt-number-container"] input')
          .type(attemptsNumber)
          .then(() => {
            cy.get('[data-cy="attempt-number-container"] button')
            .click()
            .then(() => {
              expect(stub.getCall(0)).to.be.calledWith(ATTEMPT_NUM_UNDER_MIN_ERROR)
            })
          })
      })
    })
  })

})



