describe('자동차 경주 게임', () => {
  before(() => {
    cy.visit('index.html');
  });

  context('자동차 이름은 쉼표를 기준으로 구분하여 입력할 수 있다.', () => {
    it('자동차 이름이 쉼표로 끝나도록 입력한다.', () => {
      cy.getCarNameInput().type('EAST, WEST, SOUTH, NORTH,');
      cy.alertCarNamesInput();
    });

    it('자동차 이름 길이가 1미만인 이름을 입력한다.', () => {
      cy.getCarNameInput().type('EAST, , SOUTH, NORTH');
      cy.alertCarNamesInput();
    });

    it('자동차 이름 길이가 5초과인 이름을 입력한다.', () => {
      cy.getCarNameInput().type('EAST, WEST, SOUTH, NORTHHHHHHHH');
      cy.alertCarNamesInput();
    });
  });
});
