describe("자동차 경주 게임", () => {
  before(() => {
    cy.visit("/");
  });
});

describe("자동차 이름 입력 기능 ", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("자동차에 이름을 입력할 수 있었야 한다.", () => {
    cy.getTextInput().should("be.visible");
    cy.getTextInput().type("A,B,C,D").should("have.value", "A,B,C,D");
    cy.getTextButton().should("be.visible");
  });
  describe("자동차에 이름이 5자 초과인 경우", () => {
    it("에러 문구를 표시해야 한다.", () => {
      const stub = cy.stub();
      cy.on("window:alert", stub);

      cy.getTextInput().type("AAAAAA,B,CCCCC,DDD");
      cy.getTextButton()
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith(
            "유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다."
          );
        });
    });
  });
  describe("자동차에 이름 입력이 없는 경우", () => {
    it("에러 문구를 표시해야 한다.", () => {
      const stub = cy.stub();
      cy.on("window:alert", stub);

      cy.getTextInput();
      cy.getTextButton()
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith(
            "유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다."
          );
        });
    });
  });
  describe("유효한 자동차 이름을 입력하면", () => {
    it("이름 입력 폼이 비활성화되어야 한다.", () => {
      cy.getTextInput().type("A,B,C,D").should("have.value", "A,B,C,D");
      cy.getTextButton().click();
      cy.getTextInput().should("be.disabled");
    });
  });
});