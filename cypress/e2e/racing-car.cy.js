const $inputCarNamesSelector = "input[name='car-names']";
const $inputTryNumSelector = "input[name='trynum']";
const $fieldSetCarNameSelector = "#car-names-fieldset";
const $fieldSetTryNumSelector = "#trynum-fieldset";
const $submitCarNamesButtonSelector = "#submit-car-names";
const $submitTryNumBUttonSelector = "#submit-trynum";

describe("자동차 경주", () => {
  before(() => {
    cy.visit("../../index.html");

    it("자동자 이름 입력폼이 있다", () => {
      cy.get($inputCarNamesSelector).should("exist");
    });

    it("자동자 이름 입력폼이 있다", () => {
      cy.get($inputTryNumSelector).should("exist");
    });
  });

  context("자동자 이름 입력폼이 있다면", () => {
    it("5자 초과하는 자동차 이름을 입력 시에는 알럿창을 띄운다.", () => {
      cy.on("uncaught:exception", (err, runnable) => {
        expect(err.message).to.include("유효하지 않은 입력값입니다.");
        done();
        return false;
      });

      cy.get($inputCarNamesSelector).type("hellooo");
      cy.get($submitCarNamesButtonSelector).click();
    });

    it("제출 시 다시 입력할 수 없다.", () => {
      cy.get($inputCarNamesSelector).type("EAST, WEST, SOUTH, NORTH");
      cy.get($submitCarNamesButtonSelector)
        .click()
        .then(() => {
          cy.get($fieldSetCarNameSelector).should("be.disabled");
        });
    });
  });

  context("시도횟수를 입력받는 폼이 있다면", () => {
    it("사용자는 자동차가 몇 면의 이동을 입력할 수 있는지 숫자로 입력가능하다", () => {});
    it("제출 시 다시 입력할 수 없다.", () => {});
  });

  context("자동차 이름과 시도횟수를 모두 유효하게 입력받았다면", () => {
    it("자동차는 0에서 9 사이에서 random 값을 구한 후 random 값이 4 이상일 경우 전진하고, 3 이하의 값이면 멈춘다.", () => {});
    it("자동차가 전진을 시도중이면 스피너 아이콘, 전진을 하면 화살표, 멈추면 표시를 하지 않는다.", () => {});
  });
});
