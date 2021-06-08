context("Form Tests", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:8080/");
  });

  it("이름은 5자 이하만 가능하다.", () => {
    cy.get("#car-names-input").type("5글자 테스트 중입니다.");
    cy.get("#car-names-submit").click();
    cy.on("window.alert", (text) => {
      expect(text).to.container("유효하지 않은 이름 길이입니다. ");
    });
  });

  it("이름이 비어있으면 안된다.", () => {
    cy.get("#car-names-input").type("       ");
    cy.get("#car-names-submit").click();
    cy.on("window.alert", (text) => {
      expect(text).to.container("유효하지 않은 이름 길이입니다. ");
    });
  });

  it("주어진 횟수는 1 이상이어야 한다.", () => {
    cy.get("#car-names-input").type("EAST, WEST, SOUTH, NORTH");
    cy.get("#car-names-submit").click();
    cy.get("#try-amount-input").type("0");
    cy.get("#try-amount-submit").click();
    cy.on("window.alert", (text) => {
      expect(text).to.container("입력한 레이싱 횟수가 너무 적습니다. ");
    });
  });
});
