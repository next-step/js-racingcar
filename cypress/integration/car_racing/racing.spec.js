context("Racing Tests", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:8080/");
  });

  it("정상적으로 게임의 턴이 다 동작된 후에는 2초 후에 축하의 alert 메세지를 띄운다.", () => {
    cy.get("#car-names-input").type("EAST, WEST, SOUTH, NORTH");
    cy.get("#car-names-submit").click();
    cy.get("#try-amount-input").type("2");
    cy.get("#try-amount-submit").click();
    // cy.wait("#game-result");
    cy.wait(2000);

    cy.wait(2000);

    cy.on("window.alert", (text) => {
      expect(text).to.container("축하합니다 ");
    });
  });
});
