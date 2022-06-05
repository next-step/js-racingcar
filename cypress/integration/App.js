describe("자동차 경주 미션", () => {
  it("자동차 이름은 쉼표를 기준으로 구분하여 이름은 5자 이하만 가능하다.", () => {
    cy.visit("/");
    cy.get(".input-car-name").type("south,bbbbb");
    cy.get(".submit-car-name").click();
  });

  it("사용자는 몇 번의 이동을 할 것인지를 입력할 수 있어야 한다.", () => {
    cy.get(".try-input-number").type("3");
    cy.get(".submit-try-button").click();
  });
});
