import { VALIDATE } from '../../../src/js/util/consts.js'

describe('레이싱 테스트', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  
  describe('레이싱 게임 input 테스트', () => {
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
      cy.get('[data-form=name-input]').type('raven, kiwi' + '{enter}').then(_ => {
        cy.get('[data-form=count-form]').should('be.visible')
      })
    })

    it('유효성 검증에 모두 통과하고 submit하면 자동차 이름 컴포넌트를 이용할 수 없다.', () => {
      cy.get('[data-form=name-input]').type('raven, kiwi' + '{enter}').then(_ => {
        cy.get('[data-form=count-form]').should('be.visible')
      })
    })
  })
});
  