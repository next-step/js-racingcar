import { MESSAGES } from "../../src/utils/constants";
import { winnerMessage } from "../../src/utils/helpers";

describe("자동차 경주 게임", () => {
  before(() => {
    cy.visit("/");
  });
});

/**
 * 자동차 이름 입력 기능
 *
 * - 자동차 이름은 쉼표(,)를 기준으로 구분하며 이름은 5자 이하만 가능하다.
 * - 자동차 이름을 입력받은 다음에는 이름 입력폼이 비활성화되어야 한다
 */

describe("자동차 이름 입력 기능 ", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("자동차에 이름을 입력할 수 있었야 한다.", () => {
    cy.getCarInput().should("be.visible");
    cy.getCarInput().type("A,B,C,D").should("have.value", "A,B,C,D");
    cy.getCarButton().should("be.visible");
  });
  describe("자동차에 이름이 5자 초과인 경우", () => {
    it("에러 문구를 표시해야 한다.", () => {
      const stub = cy.stub();
      cy.on("window:alert", stub);
      cy.getCarInput().type("AAAAAA,B,CCCCC,DDD");
      cy.getCarButton()
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
      cy.getCarInput();
      cy.getCarButton()
        .click()
        .then(() => {
          cy.windowAlertStub(stub, MESSAGES.INVALID_NAME);
        });
    });
  });
  describe("유효한 자동차 이름을 입력하면", () => {
    it("이름 입력 폼이 비활성화되어야 한다.", () => {
      cy.getCarInput().type("A,B,C,D").should("have.value", "A,B,C,D");
      cy.getCarButton().click();
      cy.getCarInput().should("be.disabled");
    });
  });
});

// /**
//  * 시도 횟수 입력 기능
//  *
//  * - 시도 횟수는 1번 이상이어야 한다.
//  */

describe("시도 횟수 입력 기능 ", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.getCarInput().type("A,B,C,D");
    cy.getCarButton().click();
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

/**
 * 자동차 경주 기능
 *
 * - 전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.
 * - 주어진 횟수 동안 n대의 자동차는 전진 또는 멈출 수 있다.
 * - 전진 조건은 0에서 9 사이에서 random 값을 구한 후 random 값이 4 이상일 경우 전진하고, 3 이하의 값이면 멈춘다.
 * - 자동차 경주 게임의 턴이 진행 될 때마다 1초의 텀(progressive 재생)을 두고 진행한다.
 */

describe("자동차 경주 기능", () => {
  const names = "A,B,C,D";
  const count = 5;
  const carNames = names.split(",");
  beforeEach(() => {
    cy.clock();
    cy.visit("/");
    cy.getCarInput().type(names);
    cy.getCarButton().click();
    cy.getTryTimeInput().type(count);
    cy.getTryTimeButton().click();
    cy.mockMathRandom([3, 2, 7, 8, 5, 2, 4]);
  });
  it("자동차 이름이 표시되어야 한다.", () => {
    cy.getCarContainer()
      .should("be.visible")
      .find("[data-cy=car-player]")
      .each(($el, idx) => cy.wrap($el).should("have.text", carNames[idx]));
  });
  describe("1초가 지나면", () => {
    it("랜덤값(Mock)에 따라 스피너와 포워드가 표시되어야 한다.", () => {
      cy.tick(1000);
      cy.getNthCarStatus(0, "spinner").should("be.visible");
      cy.getNthCarStatus(1, "spinner").should("be.visible");
      cy.getNthCarStatus(2, "forward").should("be.visible");
      cy.getNthCarStatus(3, "forward").should("be.visible");
    });
  });
  describe("시도횟수만큼 시간이 지나면", () => {
    it("랜덤값(Mock)이 4이상인 차들은 전진해야 한다.", () => {
      cy.tick(1000 * count);
      cy.getNthCarStatus(0, "forward").should("have.length", 2);
      cy.getNthCarStatus(1, "forward").should("have.length", 3);
      cy.getNthCarStatus(2, "forward").should("have.length", 4);
      cy.getNthCarStatus(3, "forward").should("have.length", 2);
    });
  });
});

/**
 * 결과 표시 기능
 *
 * - 자동차 경주 게임을 완료한 후 누가 우승했는지를 알려준다. 우승자는 한 명 이상일 수 있다.
 * - 우승자가 여러명일 경우 ,를 이용하여 구분한다.
 * - 정상적으로 게임의 턴이 다 동작된 후에는 결과를 보여주고, 2초 후에 축하의 alert 메세지를 띄운다.
 * - 다시 시작하기 버튼을 누르면 게임 상태를 처음으로 초기화한다.
 */

describe("결과 표시 기능", () => {
  const names = "A,B,C,D";
  const count = 5;
  beforeEach(() => {
    cy.clock();
    cy.visit("/");
    cy.getCarInput().type(names);
    cy.getCarButton().click();
    cy.getTryTimeInput().type(count);
    cy.getTryTimeButton().click();
    cy.mockMathRandom([3, 2, 7, 8]);
    cy.tick(1000 * count);
  });
  describe("경기가 종료되면", () => {
    it("우승자가 표시되고 2초뒤에 알림 메세지를 표시한다.", () => {
      const stub = cy.stub();
      cy.on("window:alert", stub);
      cy.getWinnerSection().should("be.visible");
      cy.tick(2000);
      cy.windowAlertStub(stub, MESSAGES.CELEBERATE);
    });
  });
  describe("우승자가 여러명이면", () => {
    it(",를 이용하여 구분한다.", () => {
      cy.getWinner().should("have.text", winnerMessage("C,D"));
    });
  });
  describe("다시 시작하기 버튼을 누르면", () => {
    it("게임 상태가 초기화된다..", () => {
      cy.getResetButton().click();
      cy.getCarField().should("be.visible");
      cy.getWinnerSection().should("not.exist");
      cy.getTryField().should("not.exist");
    });
  });
});
