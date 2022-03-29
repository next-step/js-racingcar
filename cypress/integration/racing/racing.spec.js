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
        expect(message).to.equal('유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다.');
      })
    });
  })
});
  