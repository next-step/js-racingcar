import { VALIDATE } from '../../../src/js/util/consts.js'

describe('레이싱 테스트', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  
  describe('레이싱 게임 input 테스트', () => {
    beforeEach(() => {
      Cypress.Commands.add('submitCarName', (inputValue) => {
        cy.get('[data-form=name-input]').type(inputValue + '{enter}')
      })
    })

    it('자동차 이름이 공란이라면 alert창을 띄운다.', () => {
      const alert = cy.stub()
      cy.on('window:alert', alert);
      cy.get('[data-form=name-button]').click().then(_ => {
        const message = alert.getCall(0).lastArg;
        expect(message).to.equal(VALIDATE.ALERT_WRONG_RACING_CAR_NAME);
      })
    });

    it('자동차 이름 Input에 값을 입력하고 쉼표하나만 입력할 시 alert창이 뜬다.', () => {
      const alert = cy.stub()
      cy.on('window:alert', alert)
      cy.get('[data-form=name-input]').type('raven,')
      cy.get('[data-form=name-button]').click().then(_ => {
        const message = alert.getCall(0).lastArg;
        expect(message).to.equal(VALIDATE.ALERT_WRONG_RACING_CAR_NAME);
      })
    });

    it('자동차 이름 유효성 검증을 통과하면 하위 UI가 보인다.', () => {
      cy.submitCarName('raven, kiwi').then(_ => {
        cy.get('[data-form=count-container]').should('be.visible')
      })
    })

    it('유효성 검증에 모두 통과하고 submit하면 자동차 이름 컴포넌트가 disabled 상태가 된다.', () => {
      cy.submitCarName('raven, kiwi').then(_ => {
        cy.get('[data-form=name-input]').should('be.disabled').and('have.value', 'raven, kiwi')
        cy.get('[data-form=name-button]').should('be.disabled')
      })
    })

    it('시도할 횟수를 입력하지 않으면 alert창 (입력한 레이싱 횟수가 너무 적습니다. 레이싱 횟수는 1이상이어야 합니다.)이 나온다.', () => {
      const alert = cy.stub()
      cy.on('window:alert', alert)
      cy.submitCarName('raven, kiwi')
      cy.get('[data-form=count-input]').type('{enter}').then(_ => {
        const message = alert.getCall(0).lastArg;
        expect(message).to.equal(VALIDATE.ALERT_LESS_RACING_COUNT);
      })
    })
  })
});
  