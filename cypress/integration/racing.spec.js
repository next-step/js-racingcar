import { contentType } from "mime-types";
import { MESSAGE } from "../../src/js/constant.js";

describe("racing", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/");
  });

  it("자동차 이름 입력 - Case 1 (정상)", () => {
    cy.get("#carname>input").type("A, B, C, D");
    cy.get("#carname>button").click();
    cy.get("#carname>button").should("be.disabled");
    cy.get("#count_filed").should("be.visible");
  });

  it("자동차 이름 입력 - Case 2 (비정상))", () => {
    cy.window().then((win) => cy.stub(win, "alert").as("windowAlert"));

    cy.get("#carname>input").type("AAAAAA, B, C, D");
    cy.get("#carname>button").click();

    cy.get("@windowAlert").should("be.calledWith", MESSAGE.CAR_NAME);
  });

  it("자동차 이름 입력 - Case 3 (비정상)", () => {
    cy.window().then((win) => cy.stub(win, "alert").as("windowAlert"));

    cy.get("#carname>input").type("A, BB, , DDDD");
    cy.get("#carname>button").click();

    cy.get("@windowAlert").should("be.calledWith", MESSAGE.CAR_NAME);
  });

  it("전체 입력 - Case 1 (정상)", () => {
    cy.window().then((win) => cy.stub(win, "alert").as("windowAlert"));

    cy.get("#carname>input").type("AA, BB, CC, DD");
    cy.get("#carname>button").click();
    cy.get("#carname>button").should("be.disabled");
    cy.get("#count_filed").should("be.visible");

    cy.get("#count>input").type("5");
    cy.get("#count>button").click();
    cy.get("#count>button").should("be.disabled");
    cy.get("#process_section").should("be.visible");

    cy.wait(5000).get("#result_section").should("be.visible");

    cy.wait(2000).get("@windowAlert").should("be.calledWith", MESSAGE.CELEBRATE);
  });

});
