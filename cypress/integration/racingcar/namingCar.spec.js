describe('자동차에 이름을 부여할 수 있다. 전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080');
    });

    it('자동차에 이름을 부여할 수 있다.', () => {
        //given
        const names = 'EAST, WEST, SOUTH, NORTH';
        const splitNames = names.split(', ');

        //when
        cy.getBySel('names-input')
          .type(names);
        cy.getBySel('names-input-button')
          .click();
        cy.getBySel('count-input')
          .type(3);
        cy.getBySel('count-input-button')
          .click();

        //then
        cy.getBySel('car')
          .each(($el, index) => {
              cy.wrap($el)
                .contains(splitNames[index]);
          });
    });

    // it('전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.', () => {
    //
    // });
});
