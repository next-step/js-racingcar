const NAMES = ['EAST', 'WEST', 'SOUTH', 'NORTH'];
const ROUND = 3;

const startGame = () => {
  cy.getBySel('car-names-input').as('nameInput');
  cy.getBySel('car-names-btn').as('nameBtn');
  cy.getBySel('try-number-input').as('tryNumInput');
  cy.getBySel('try-number-btn').as('tryNumBtn');
  // TODO: fixture로 car의 이름을 가져오도록 만들자
  cy.typeToTarget('@nameInput', NAMES.join(',')).clickTarget('@nameBtn');
  cy.typeToTarget('@tryNumInput', ROUND).clickTarget('@tryNumBtn');
}

describe('Racing TEST!!', () => {
  beforeEach(function () {
    // NOTE: baseUrl을 설정해놓음
    cy.visit('/');
    startGame();
  });

  it('자동차에 이름을 부여할 수 있다.', () => {
    NAMES.forEach((carName, i) => {
      cy.get('.racing-track').find(`[data-car="${i}"]`).contains(carName);
    });
  });
  
  it('정상적으로 게임의 턴이 다 동작된 후에는 결과를 보여주고 2초 후에 축하의 alert 메세지를 띄운다.', () => {
      cy.window().then((window) => cy.stub(window, "alert").as("alert"));
      cy.get("@alert").should("not.be.called");
      cy.wait(1000 * ROUND + 2000);
      cy.get("@alert").should("be.calledWith", '축하합니다');
    });

  it('다시시작하기 버튼을 누르면 게임이 다시 시작된다.', () => {
    // NOTE: beforeEach로 게임은 이미 시작됨.
    cy.wait(1000 * ROUND + 2000)
    cy.get('.result-pane__btn')
      .click();
    startGame();
    cy.get('.result-pane')
      .should('have.not.class', 'hidden')
  });
  
    // TODO: 심화 선택 요구사항
    // it('자동차 경주 게임의 턴이 진행 될 때마다 1초의 텀(progressive)를 두고 진행한다.', () => {
    // });
  
});

// TODO:
