import { MSG } from "./../../src/js/utils/constants";

describe("racingcar", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5500/");
  });

  const alertMessage = (msg) => {
    cy.on("window:alert", (str) => {
      expect(str).to.equal(msg);
    });
  };

  context(
    "자동차 이름은 쉼표(,)를 기준으로 구분하며 이름은 5자 이하만 가능하다.",
    () => {
      it("이름이 없는 경우 알럿창", () => {
        cy.get("#submitCarName").click();
        alertMessage(MSG.INVALID_CAR_NAME);
      });

      it("공백만 입력하는 경우", () => {
        cy.get("#inputCarName").type("   ");
        cy.get("#submitCarName").click();
        alertMessage(MSG.INVALID_CAR_NAME);
      });

      it("콤마만 입력하는 경우", () => {
        cy.get("#inputCarName").type(",");
        cy.get("#submitCarName").click();
        alertMessage(MSG.INVALID_CAR_NAME);
      });

      it(", aaa 라고 입력하는 경우", () => {
        cy.get("#inputCarName").type(", aaa");
        cy.get("#submitCarName").click();
        alertMessage(MSG.INVALID_CAR_NAME);
      });

      it("이름이 5자 이상이면 알럿창", () => {
        cy.get("#inputCarName").type("bb, aaaaaa");
        cy.get("#submitCarName").click();
        alertMessage(MSG.INVALID_CAR_NAME);
      });
    }
  );

  it("이름이 중복되어 있는 경우", () => {
    cy.get("#inputCarName").type("aa, aa");
    cy.get("#submitCarName").click();
    alertMessage(MSG.DUPLICATE_CAR_NAME);
  });

  it("자동차 이름을 부여하면 시도할 횟수 입력창이 노출된다.", () => {
    cy.get("#inputCarName").type("a, b, c");
    cy.get("#submitCarName").click();
    cy.get("#inputRaceTimes").should("be.visible");
  });

  it("입력이 완료되면 다시 입력할 수 없다.", () => {
    cy.get("#inputCarName").type("a, b, c");
    cy.get("#submitCarName").click();
    cy.get("#submitCarName").should("exist");
  });

  it("사용자는 몇 번의 이동을 할 것인지를 입력할 수 있어야 한다.", () => {
    cy.get("#inputCarName").type("a, b, c");
    cy.get("#submitCarName").click();
    cy.get("#inputRaceTimes").type("3");
    cy.get("#submitRaceTimes").click();
    cy.get("#carRacingWrap").should("exist");
  });

  context("시도할 횟수는 1 이상이어야 한다.", () => {
    it("아무것도 입력하지 않은 경우", () => {
      cy.get("#inputCarName").type("a, b, c");
      cy.get("#submitCarName").click();
      cy.get("#submitRaceTimes").click();
      alertMessage(MSG.INVALID_RACING_TIMES);
      cy.get("#carRacingWrap .mt-4").should("not.exist");
    });

    it("0을 입력한 경우", () => {
      cy.get("#inputCarName").type("a, b, c");
      cy.get("#submitCarName").click();
      cy.get("#inputRaceTimes").type("0");
      cy.get("#submitRaceTimes").click();
      alertMessage(MSG.INVALID_RACING_TIMES);
      cy.get("#carRacingWrap .mt-4").should("not.exist");
    });

    it("ㅁ을 입력한 경우", () => {
      cy.get("#inputCarName").type("a, b, c");
      cy.get("#submitCarName").click();
      cy.get("#inputRaceTimes").type("ㅁ");
      cy.get("#submitRaceTimes").click();
      alertMessage(MSG.INVALID_RACING_TIMES);
      cy.get("#carRacingWrap .mt-4").should("not.exist");
    });
  });
});
