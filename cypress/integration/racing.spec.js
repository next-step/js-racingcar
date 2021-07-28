import { MESSAGES } from "../../src/utils/constants";

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
          cy.windowAlertStub(stub, MESSAGES.INVALID_NAME);
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
          cy.windowAlertStub(stub, MESSAGES.INVALID_NAME);
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

describe("시도 횟수 입력 기능 ", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.getTextInput().type("A,B,C,D");
    cy.getTextButton().click();
  });
  it("시도 횟수를 입력할 수 있었야 한다.", () => {
    cy.getTryTimeInput().should("be.visible");
    cy.getTryTimeInput().type("5").should("have.value", "5");
    cy.getTryTimeButton().should("be.visible");
  });

  describe("시도 횟수를 0으로 입력한 경우", () => {
    it("에러 문구를 알림창으로 표시해야 한다.", () => {
      const stub = cy.stub();
      cy.on("window:alert", stub);
      cy.getTryTimeInput().type("0");
      cy.getTryTimeButton()
        .click()
        .then(() => {
          cy.windowAlertStub(stub, MESSAGES.INVALID_TRYTIME);
        });
    });
  });
  describe("시도 횟수 입력하지 않은 경우", () => {
    it("에러 문구를 알림창으로 표시해야 한다.", () => {
      const stub = cy.stub();
      cy.on("window:alert", stub);
      cy.getTryTimeButton()
        .click()
        .then(() => {
          cy.windowAlertStub(stub, MESSAGES.INVALID_TRYTIME);
        });
    });
  });
});
