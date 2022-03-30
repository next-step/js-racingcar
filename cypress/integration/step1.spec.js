/// <reference types="cypress" />

describe('step1', () => {
    beforeEach(() => {
        cy.visit('../../index.html')
    })

    it('app이 존재해야한다', () => {
        cy.get('#app').should('exist')
    });
    
})
