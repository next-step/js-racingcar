/// <reference types="cypress" />


describe('step3', () => {
    before(() => {
        cy.visit('../../index.html')
    })

    it('app이 존재해야한다', () => {
        cy.get('#app').should('exist')
    });

    describe('자동차 경주 게임을 완료한 후', () => {
        before(() => {
            cy.get('.car-name-input').type('자동차1,자동차2');
            cy.get('.car-name-input + button:contains("확인")').click();
            cy.get('.try-count-input').type('2');
            cy.get('.try-count-input + button:contains("확인")').click()
        })

        it('축하 메세지를 띄운다.', () => {
            cy.on('window:alert', (str) => {
                expect(str).to.be.equal('🎇🎇🎇🎇축하합니다!🎇🎇🎇🎇')
            })
        })
    })
})
