import { ERROR_MESSAGE } from "../../src/js/utils/constnats";
// import * as utils from "../../src/js/utils/utils.js";

describe("racing car game", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080");
  });

  const setGame = (carNames, racingTimes) => {
    inputCarNames(carNames);
    inputRacingTimes(racingTimes);
  };

  const inputCarNames = (carNames) => {
    cy.get(".car-name-input").type(carNames);
    cy.get(".car-name-submit").click();
  };

  const inputRacingTimes = (racingTimes) => {
    cy.get(".racing-times-input").type(racingTimes);
    cy.get(".racing-times-submit").click();
  };

  context("자동차 이름 입력 시", () => {
    it(",를 기준으로 하단에 이름이 반영된다.", () => {
      inputCarNames("A, B, C, D");

      cy.get(".car-list")
        .should("contain.text", "A")
        .and("contain.text", "B")
        .and("contain.text", "C")
        .and("contain.text", "D");
    });

    it("하나 이상의 이름이 1자 미만이면 경고창이 뜬다.", () => {
      inputCarNames("A, , C, D");

      cy.on("window:alert", (error) =>
        expect(error).to.contains(ERROR_MESSAGE.NAME_LENGTH)
      );
      cy.get(".car-list")
        .should("not.contain.text", "A")
        .and("not.contain.text", "C")
        .and("not.contain.text", "D");
    });

    it("하나 이상의 이름이 5자를 초과하면 경고창이 뜬다.", () => {
      inputCarNames("ABCDEF, B, C, D");

      cy.on("window:alert", (error) =>
        expect(error).to.contains(ERROR_MESSAGE.NAME_LENGTH)
      );
      cy.get(".car-list")
        .should("not.contain.text", "ABCDEF")
        .and("not.contain.text", "B")
        .and("not.contain.text", "C")
        .and("not.contain.text", "D");
    });

    it("횟수 입력 전까지는 로딩이미지가 뜨지 않는다.", () => {
      inputCarNames("A,B,C,D");

      cy.get(".loading-spinner").should("not.exist");
    });
  });

  context("횟수 입력 시", () => {
    it("자동차 수 만큼의 로딩이미지가 표시된다.", () => {
      inputCarNames("A,B,C,D");
      inputRacingTimes(1);

      cy.get(".loading-spinner").should("have.length", 4);
    });

    it("1 이하의 수를 입력하면 경고창이 뜬다.", () => {
      inputCarNames("A,B,C,D");
      inputRacingTimes(-1);

      cy.on("window:alert", (error) =>
        expect(error).to.contains(ERROR_MESSAGE.RACING_TIMES)
      );
      cy.get(".loading-spinner").should("not.exist");
    });
  });

  // TODO: mocking이 되지 않고 운좋게 통과하고 있었음
  // context("게임 진행 시", () => {
  //   it("랜덤 값이 4 이상이면 1초 이후에 forward 아이콘이 생긴다", () => {
  //     cy.stub(utils, "generateRandom").returns(4);
  //
  //     setGame("A", 1);
  //     cy.get(".forward-icon").should("not.exist");
  //     cy.wait(1000);
  //     cy.get(".forward-icon").should("exist");
  //   });
  //
  //   it("랜덤 값이 3 이하면 1초 이후에도 forward 아이콘이 생기지 않는다.", () => {
  //     cy.stub(utils, "generateRandom").returns(3);
  //
  //     setGame("A", 1);
  //     cy.get(".forward-icon").should("not.exist");
  //     cy.wait(1000);
  //     cy.get(".forward-icon").should("not.exist");
  //   });
  // });

  context("게임 종료 시", () => {
    it("우승자 이름을 출력", () => {
      setGame("a", 1);
      cy.get(".winner-list").should("contain.text", "a");
    });
  });
});
