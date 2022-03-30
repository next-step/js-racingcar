/// <reference types="cypress" />

describe('step1', () => {
    beforeEach(() => {
        cy.visit('../../index.html')
    })

    it('app이 존재해야한다', () => {
        cy.get('#app').should('exist')
    });

    context('자동차이름을 쉼표를 기준으로 구분하여 입력하고 확인버튼을 누르면', () => {
        before(() => {
            cy.get('[placeholder="자동차 이름"]').type('자동차1,자동차2,자동차3');
            cy.get('[placeholder="자동차 이름"] + button:contains("확인")').click();
        })

        it('시도횟수 입력 입력폼이 노출된다', () => {
            cy.get('.try-count').should('be.visible');
        })

        context('시도 횟수를 입력하고 확인 버튼을 누르면', () => {
            before(() => {
                cy.get('[placeholder="시도 횟수"]').type('2');
                cy.get('[placeholder="시도 횟수"] + button:contains("확인")').click();
            })
            it('쉼표를 기준으로 나뉘어 자동차 이름이 지정된다.', () => {
                cy.get('.car-player').get(0).should('have.text', '자동차1');
                cy.get('.car-player').get(1).should('have.text', '자동차2');
                cy.get('.car-player').get(2).should('have.text', '자동차3');
            })
            // it('경주가 진행되고 결과가 나온다.', () => {
            //
            // })
        })
    })


})
