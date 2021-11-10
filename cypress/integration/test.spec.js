import { ERROR_TEXT, CLASS_TYPE } from "../../src/js/constants";
import { play, printResult } from "../../src/js/racing";
import { helper as racingHelper } from "../../src/js/utils";

const helper = {
  inputCars: () => {
    cy.get("#cars-input").type("1, 2, 3, 4, 5");
    cy.get("#cars-button").click();
  },
  inputTurns: () => {
    cy.get("#turns-input").type(10);
    cy.get("#turns-button").click();
  },
};

describe("car 입력", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.on("window:alert", (txt) => {
      expect(txt).to.contains(ERROR_TEXT.CARS_NAME_LENGTH);
    });
  });

  it("car 미입력", () => {
    cy.get("#cars-button").click();
  });

  it("car 5글자 이상 입력", () => {
    cy.get("#cars-input").type("123456789");
    cy.get("#cars-button").click();
  });

  it("car 입력 후 turn form 노출", () => {
    helper.inputCars();

    cy.get("#turns-input").should("not.have.class", CLASS_TYPE.DISPLAY_NONE);
  });
});

describe("turn 입력", () => {
  beforeEach(() => {
    cy.visit("/");
    helper.inputCars();
    cy.on("window:alert", (txt) => {
      expect(txt).to.contains(ERROR_TEXT.ZERO_TURNS_INPUT);
    });
  });

  it("turns 0 입력", () => {
    cy.get("#turns-input").type(0);
    cy.get("#turns-button").click();
  });

  it("turns 음수 입력", () => {
    cy.get("#turns-input").type(-10);
    cy.get("#turns-button").click();
  });

  it("turns 정상 입력시 stadium 노출", () => {
    helper.inputTurns();

    cy.get("#stadium-section").should(
      "not.have.class",
      CLASS_TYPE.DISPLAY_NONE
    );
  });
});

describe("stadium 테스트", () => {
  beforeEach(() => {
    cy.visit("/");
    helper.inputCars();
    helper.inputTurns();
  });

  it("car 생성 확인", () => {
    cy.get(".car-player").should("have.length", 5);
  });

  it("1초마다 실행 확인", () => {
    cy.stub(racingHelper, "isForward", () => true);
    let turn = 10;
    cy.clock();
    while (turn--) {
      cy.tick(1000);
      cy.get(".car-wrapper:first .forward-icon").should(
        "have.length",
        10 - turn
      );
    }
  });
});

describe("결과 확인", () => {
  beforeEach(() => {
    cy.visit("/");
    helper.inputCars();
    helper.inputTurns();
  });

  it("우승자 확인", () => {});
});
