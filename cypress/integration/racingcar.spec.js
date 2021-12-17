import { errorMsgs } from "../../src/constants.js";

beforeEach(() => {
  cy.visit("http://localhost:5500/");
});

describe("racing-car", () => {
  context("자동차 이름과 시도횟수를 입력받는다.", () => {
    it("이름을 입력하지 않고 확인을 누르면 에러가 발생한다", () => {
      cy.get(".carName-input").type("{enter}");
      cy.on("window:alert", (text) =>
        expect(text).to.equal(errorMsgs.EMPTY_NAME)
      );
    });

    it("시도횟수를 입력하지 않고 확인을 누르면 에러가 발생한다", () => {
      cy.get(".carName-input").type("a, b").type("{enter}");
      cy.get(".trialCount-input").type("{enter}");
      cy.on("window:alert", (text) =>
        expect(text).to.equal(errorMsgs.EMPTY_TRIAL_COUNT)
      );
    });

    it("이름을 입력하고 확인을 누르면 fieldset이 비활성화된다.", () => {
      /*
       * 자동차 이름 input을 입력하고 엔터를 입력한다.
       * 자동차 이름 fieldset이 disabled 속성을 가지고 있는지 확인한다.
       */
      cy.get(".carName-input").type("a, b, c").type("{enter}");
      cy.get("#fieldset-carName").should("have.attr", "disabled");
    });

    it("이름을 제출하지 않고 시도횟수를 입력하면 에러가 발생한다.", () => {
      /*
       * 페이지를 새로고침한다.
       * 시도횟수를 입력하고 엔터를 입력한다.
       * alert로 에러 메시지가 출력된다.
       * 이름, 시도횟수 fieldset이 모두 활성화되어있는지 확인한다.
       */
      cy.reload(true);
      cy.get(".trialCount-input").type(5).type("{enter}");
      cy.on("window:alert", (text) =>
        expect(text).to.equal(errorMsgs.EMPTY_NAME)
      );
      cy.get("#fieldset-carName").should("not.have.attr", "disabled");
      cy.get("#fieldset-trialCount").should("not.have.attr", "disabled");
    });

    it("이름과 시도횟수가 정상적으로 입력되면 두 fieldset이 비활성화된다.", () => {
      cy.reload(true);
      cy.get(".carName-input").type("a, b, c").type("{enter}");
      cy.get(".trialCount-input").type(5).type("{enter}");
      cy.get("#fieldset-carName").should("have.attr", "disabled");
      cy.get("#fieldset-trialCount").should("have.attr", "disabled");
    });
  });

  context("자동차 이름과 시도횟수를 입력하면 게임 필드를 출력한다", () => {
    it("이름은 5자 이하만 가능하다.", () => {
      // 5글자가 넘어가는 이름을 입력하면 에러가 발생한다.
      cy.get(".carName-input").type("aaaaaa, b").type("{enter}");
      cy.on("window:alert", (text) =>
        expect(text).to.equal(errorMsgs.MAX_LENGTH_NAME)
      );
    });

    it("쉼표를 기준으로 이름을 구분하고 출력한다.", () => {
      cy.get(".carName-input").type("a, b, c").type("{enter}");
      cy.get(".trialCount-input").type(5).type("{enter}");
      cy.get(".car-wrapper").children().should("have.length", 3);
    });
  });

  context("우승자를 출력한다.", () => {
    it("우승자 필드가 출력된다.", () => {
      cy.get(".carName-input").type("a, b, c").type("{enter}");
      cy.get(".trialCount-input").type(5).type("{enter}");
      // 특정 class가 포함된 element가 존재하는지 확인
      cy.get(".winner-section").should("be.visible");
    });
  });
});
