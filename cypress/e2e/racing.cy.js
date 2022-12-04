describe('로또 구현 테스트 :: 지난주 로또 번호 입력', () => {
    beforeEach('로또 페이지 방문', () => {
        cy.visit('/');
    })

    beforeEach('로또 구입', () => {
        cy.typePurchaseInput('3000').type('{enter}');
    })

    statsSpec();
})