beforeEach(() => {
  cy.visit("http://localhost:5500/");
});

describe("racing-car", () => {
  context("사용자는 자동차 이름과 시도횟수를 입력받는다.", () => {
    it("이름을 입력하고 확인을 누르면 fieldset 비활성화", () => {
      // 자동차 이름 form에 사용자가 입력한다.
      // 확인버튼을 누르거나 엔터를 눌러 form을 제출한다.
      cy.get(".carName-input").type("a, b, c").type("{enter}");
      // 자동차 이름 form? fieldset이 비활성화된다.
      cy.get("#fieldset-carName").should("have.attr", "disabled");
    });

    it("이름을 제출하지 않고 시도횟수를 입력하면 에러가 발생한다.", () => {
      // 페이지를 새로고침한다.
      cy.reload(true);
      // 시도횟수를 입력하고 제출한다.
      cy.get(".trialCount-input").type(5).type("{enter}");
      // 에러메시지가 alert로 뜬다.
      cy.on("window:alert", (text) =>
        expect(text).to.equal("자동차 이름을 입력하고 시도횟수를 입력해주세요.")
      );
      // 두 개의 입력폼이 모두 활성화된다.
      cy.get("#fieldset-carName").should("not.have.attr", "disabled");
      cy.get("#fieldset-trialCount").should("not.have.attr", "disabled");
    });

    it("이름과 시도횟수가 정상적으로 입력되면 두 필드가 잠긴다.", () => {
      cy.reload(true);
      cy.get(".carName-input").type("a, b, c").type("{enter}");
      cy.get(".trialCount-input").type(5).type("{enter}");
      cy.get("#fieldset-carName").should("have.attr", "disabled");
      cy.get("#fieldset-trialCount").should("have.attr", "disabled");
    });
  });

  context("자동차 이름을 입력하면 출력한다", () => {
    it("이름은 5자 이하만 가능하다.", () => {
      // 5글자가 넘어가는 이름을 입력하면 에러가 발생한다.
      cy.get(".carName-input").type("aaaaaa, b").type("{enter}");
      cy.on("window:alert", (text) =>
        expect(text).to.equal("이름이 5자 넘어가면 안됩니다.")
      );
    });
    it("쉼표를 기준으로 이름을 구분하고 출력한다.", () => {
      cy.get(".carName-input").type("a, b, c").type("{enter}");
      cy.get(".trialCount-input").type(5).type("{enter}");

      // car-wrapper 안에 car-container 여러개 & 그 안에 car-player이름
      cy.get(".car-wrapper").children().should("have.length", 3);
    });
  });
});
