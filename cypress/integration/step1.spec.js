import { ALERT_STRING } from "../../src/js/constant.js";

describe("STEP 1", function () {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/index.html");
  });

  const CARS_INPUT_FIELD_SELECTOR = "#cars-input-form fieldset input";
  const CARS_INPUT_FIELDSET_SELECTOR = "#cars-input-form fieldset";
  const COUNT_INPUT_FIELD_SELECTOR = "#count-input-form fieldset input";
  const COUNT_INPUT_FIELDSET_SELECTOR = "#count-input-form fieldset";

  context("화면 렌더링에 관련된 테스트", () => {
    it("최초 랜더 시, 자동차 이름을 입력할 수 있는 입력창이 보여진다. ", function () {
      cy.get(CARS_INPUT_FIELD_SELECTOR).should("be.visible");
    });

    it("자동차 이름을 입력하지 않을 경우 적절한 placeholder가 보여진다. ", function () {
      cy.get(CARS_INPUT_FIELD_SELECTOR).clear();
      cy.get(CARS_INPUT_FIELD_SELECTOR).should(
        "have.attr",
        "placeholder",
        "자동차 이름"
      );
    });

    it("자동차 이름 입력에 성공하면, 시도할 횟수를 입력할 수 있는 입력창이 보여진다. ", function () {
      cy.get(COUNT_INPUT_FIELD_SELECTOR).should("be.not.visible");
      const inputExample = "호랑이,거북이,고양이,원숭이,부엉이";
      cy.get(CARS_INPUT_FIELD_SELECTOR).type(inputExample).type("{enter}");

      cy.get(COUNT_INPUT_FIELD_SELECTOR).should("be.visible");
    });

    it("시도할 횟수에 아무것도 입력하지 않을 경우 적절한 placeholder가 보여진다. ", function () {
      const inputExample = "호랑이,거북이,고양이,원숭이,부엉이";
      cy.get(CARS_INPUT_FIELD_SELECTOR).type(inputExample).type("{enter}");

      cy.get(COUNT_INPUT_FIELD_SELECTOR).clear();
      cy.get(COUNT_INPUT_FIELD_SELECTOR).should(
        "have.attr",
        "placeholder",
        "시도 횟수"
      );
    });
  });

  context("자동차 이름, 시도 횟수 입력 테스트", () => {
    it("5자를 초과하는 자동차 이름이 하나 이상 입력될 경우 경고창이 띄워진다. ", function () {
      const inputExample = "Squirrel,Otter,Hamster,Goose,Horse";
      const alertStub = cy.stub();
      cy.on("window:alert", alertStub);

      cy.get(CARS_INPUT_FIELD_SELECTOR)
        .type(inputExample)
        .type("{enter}")
        .then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith(
            ALERT_STRING.INVALID_CAR_NAME
          );
        });
    });

    it("자동차 입력을 완료한 경우 입력을 수정할 수 없도록 입력창이 비활성화된다. ", function () {
      const inputExample = "호랑이,거북이,고양이,원숭이,부엉이";
      cy.get(CARS_INPUT_FIELD_SELECTOR).type(inputExample).type("{enter}");
      cy.get(CARS_INPUT_FIELDSET_SELECTOR)
        .invoke("prop", "disabled")
        .should("eq", true);
    });

    it("숫자 입력을 완료한 경우 입력을 수정할 수 없도록 입력창이 비활성화된다. ", function () {
      const inputExample = "호랑이,거북이,고양이,원숭이,부엉이";
      cy.get(CARS_INPUT_FIELD_SELECTOR).type(inputExample).type("{enter}");
      cy.get(COUNT_INPUT_FIELD_SELECTOR).type(5).type("{enter}");
      cy.get(COUNT_INPUT_FIELDSET_SELECTOR)
        .invoke("prop", "disabled")
        .should("eq", true);
    });

    it("자동차 이름, 시도 횟수를 모두 입력할 경우 입력된 자동차가 화면에 보여진다. ", function () {
      const inputExample = "호랑이,거북이,고양이,원숭이,부엉이";
      const inputExampleArray = inputExample.split(",");
      cy.get(CARS_INPUT_FIELD_SELECTOR).type(inputExample).type("{enter}");
      cy.get(COUNT_INPUT_FIELD_SELECTOR).type(5).type("{enter}");
      cy.get(".car-player").each((element, index) => {
        const expectedString = inputExampleArray[index];
        expect(element.text()).to.equal(expectedString);
      });
    });
  });

  context("자동차 전진 테스트", () => {
    it("입력한 횟수만큼 모든 자동차가 움직인다. ", function () {
      const inputExample = "호랑이,거북이,고양이,원숭이,부엉이";
      const inputCount = 5;
      cy.get(CARS_INPUT_FIELD_SELECTOR).type(inputExample).type("{enter}");
      cy.get(COUNT_INPUT_FIELD_SELECTOR).type(inputCount).type("{enter}");
      cy.get("#car .car-path").should("have.length", inputCount);
    });
  });


  context("경주 결과 테스트", () => {
    it("경주 거리가 가장 높은 자동차가 최종 우승자가 된다.", () => {
      const inputExample = "호랑이,거북이,고양이,원숭이,부엉이";
      const inputCount = 5;
      cy.get(CARS_INPUT_FIELD_SELECTOR).type(inputExample).type("{enter}");
      cy.get(COUNT_INPUT_FIELD_SELECTOR).type(inputCount).type("{enter}");

      setTimeout(() => {
        const winnerNode = [...document.querySelectorAll(".car-path")].reduce(
          (prev, current) => {
            return prev.childElementCount > current.childElementCount
              ? prev
              : current;
          }
        );
        const winner = winnerNode.previousElementSibling.textContent;
        cy.get("winner-text").should(
          "have.text",
          `🏆 최종 우승자: ${winner} 🏆`
        );
      }, 10000);
    });
  });

  context("다시 시작하기 테스트", () => {
    it("다시 시작하기 버튼을 누르면 앱이 초기화된다. ", () => {
      const inputExample = "호랑이,거북이,고양이,원숭이,부엉이";
      const inputCount = 5;
      cy.get(CARS_INPUT_FIELD_SELECTOR).type(inputExample).type("{enter}");
      cy.get(COUNT_INPUT_FIELD_SELECTOR).type(inputCount).type("{enter}");

      setTimeout(() => {
        cy.get("restart-button").click();
        cy.get(COUNT_INPUT_FIELD_SELECTOR).should("be.not.visible");
      }, 10000);
    });
  });
});
