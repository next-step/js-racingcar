describe('자동차 경주 게임', () => {
  before(() => {
    cy.visit('index.html');
  });

  context('자동차 이름은 쉼표를 기준으로 구분하여 입력할 수 있다.', () => {
    it('자동차 이름이 쉼표로 끝나도록 입력한다.', () => {
      cy.getCarNameInput().type('EAST, WEST, SOUTH, NORTH,');
      cy.alertCarNamesInput();
    });

    it('자동차 이름 길이가 1 미만인 이름을 입력한다.', () => {
      cy.getCarNameInput().clear();
      cy.getCarNameInput().type('EAST, , SOUTH, NORTH');
      cy.alertCarNamesInput();
    });

    it('자동차 이름 길이가 5 초과인 이름을 입력한다.', () => {
      cy.getCarNameInput().clear();
      cy.getCarNameInput().type('EAST, WEST, SOUTH, NORTHHHHHHHH');
      cy.alertCarNamesInput();
    });

    it('길이가 모두 1 ~ 5 사이인 자동차 이름을 입력한다.', () => {
      cy.getCarNameInput().clear();
      cy.getCarNameInput().type('EAST, WEST, SOUTH, NORTH');
      cy.getCarNameSubmitButton().click();

      cy.getCarNameInput().should('be.disabled');
      cy.getCarNameSubmitButton().should('be.disabled');
      cy.getInputRaceTimesSection().should('be.visible');
    });
  });

  context('사용자는 몇 번의 이동을 할 것인지를 입력할 수 있다.', () => {
    it('자동차 경주 시도 횟수를 1 미만으로 입력한다.', () => {
      cy.getRaceTimesInput().type(-1);
      cy.alertRaceTimesInput();
    });

    it('1 이상의 자동차 경주 시도 횟수를 입력한다.', () => {
      cy.getRaceTimesInput().clear();
      cy.getRaceTimesInput().type(1);
      cy.getRaceTimesSubmitButton().click();

      cy.getRaceTimesInput().should('be.disabled');
      cy.getRaceTimesSubmitButton().should('be.disabled');
      cy.getCarsContainer().should('be.visible');
    });
  });
});
