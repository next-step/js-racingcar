describe('로또 미션 Cypress', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  context('START', () => {
    it('(1) 초기화면 상태 테스트', () => {
      cy.get('#car-name-input').should('to.be.visible');
      cy.get('#car-name-submit-btn').should('to.be.visible');
      cy.get('#racing-times-input').should('not.be.visible');
      cy.get('#racing-times-submit-btn').should('not.be.visible');
    });

    it('(2) 유효하지 않은 자동차 이름 등록 테스트', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);
      cy.get('#car-name-input').should('have.value', '');
      cy.get('#car-name-submit-btn')
        .click()
        .then(() => {
          expect(alertStub).to.be.calledWith('자동차 이름을 입력해주세요!');
        });
    });

    it('(2) 유효한 자동차 이름 등록 테스트', () => {
      const mockRacingCar = ['벤틀리', '티코', '벤츠', 'BMW', '모닝'].join(',');
      cy.get('#car-name-input').type(mockRacingCar);
      cy.get('#car-name-submit-btn').click();
      cy.get('#car-name-submit-btn').should('be.disabled');
      cy.get('#racing-times-input').should('be.visible');
      cy.get('#racing-times-submit-btn').should('be.visible');
    });
  });
});
