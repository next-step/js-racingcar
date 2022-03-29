import { VALIDATE } from '../../../src/js/util/consts.js'

describe('레이싱 테스트', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  
  describe('레이싱카 이름 input 테스트', () => {
    it('자동차 이름이 공란이라면 alert창을 띄운다.', () => {
      const alert = cy.stub()
      cy.on('window:alert', alert);
      cy.get('[data-form=name-button]').click().then(_ => {
        const message = alert.getCall(0).lastArg;
        expect(message).to.equal(VALIDATE.ALERT_WRONG_RACING_CAR_NAME);
      })
    });
  })
});
  