describe("lotto", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/");
  });

  it("자동차 이름 작성 후, 게임이 시작되면 자동차명이 게임 화면에 같이 출력된다.", () => {
    const carNames = ["red", "blue", "green"];
    cy.get("#car-name-input").type(carNames.join(","));
    cy.get("#car-name-btn").click();
    cy.get("#try-count-input").type("3");
    cy.get("#try-count-btn").click();

    cy.get(".car-player").each((item, index) => {
      expect(Cypress.$(item).text()).to.be.equal(carNames[index]);
    });
  });

  it("5자 초과의 자동차 이름을 등록하면 경고창이 뜬다.", () => {
    const alertStub = cy.stub();
    cy.on("window:alert", alertStub);

    cy.get("#car-name-input").type("red,blueeeee,green");
    cy.get("#car-name-btn")
      .click()
      .then(() => {
        expect(alertStub).to.be.calledWith(
          "5자 이하의 자동차 이름을 입력하세요."
        );
      });
  });
});
