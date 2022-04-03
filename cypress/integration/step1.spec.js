describe("STEP 1", function () {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/index.html");
  });

  context("최초 화면 렌더링에 관련된 테스트", () => {
    it("최초 랜더 시, 자동차 이름을 입력할 수 있는 입력창이 보여진다. ", function () {
      cy.get("#cars-input").should("be.visible");
    });

    it("시도할 횟수를 입력할 수 있는 입력창이 보여진다. ", function () {
      cy.get("#count-input").should("be.visible");
    });

    it("자동차 이름을 입력하지 않을 경우 적절한 placeholder가 보여진다. ", function () {
      cy.get("#cars-input").clear();
      cy.get("#cars-input").should("have.attr", "placeholder", "자동차 이름");
    });

    it("시도할 횟수에 아무것도 입력하지 않을 경우 적절한 placeholder가 보여진다. ", function () {
      cy.get("#count-input").clear();
      cy.get("#count-input").should("have.attr", "placeholder", "시도 횟수");
    });
  });

  context("자동차 이름 입력 테스트", () => {
    it("자동차 이름을 쉼표로 구분하여 입력할 경우 입력된 자동차가 화면에 보여진다. ", function () {
      const inputExample = "호랑이,거북이,고양이,원숭이,부엉이";
      const inputExampleArray = inputExample.split(",");
      cy.get("#cars-input").type(inputExample);
      cy.get(".car-player").each((element, index) => {
        const expectedString = inputExampleArray[index];
        expect(element.text()).to.equal(expectedString);
      });
    });
  });
});
