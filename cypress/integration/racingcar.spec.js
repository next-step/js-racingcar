import { MESSAGES, TIMER } from "../../src/js/constant.js";

describe("racingcar", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  const inputCarNames = ({ names }) => {
    cy.get("#input-car-name").type(names);
    cy.get("#submit-car-name").click();
  };

  const inputGoalCount = ({ count }) => {
    cy.get("#input-race-times").type(count);
    cy.get("#submit-race-times").click();
  };

  const startGame = ({ names, count }) => {
    inputCarNames({ names });
    inputGoalCount({ count });
    cy.wait(+count * TIMER.MOVE);
    cy.wait(TIMER.CONGRATS);
    cy.on("window:alert", (txt) => expect(txt).to.contains(MESSAGES.CONGRATS));
  };

  const restart = () => {
    cy.get("#restart-button").click();
  };

  it("자동차 이름 입력", () => {
    inputCarNames({ names: "A, BB, CCC, DDDD, EEEEE" });
  });

  it("자동차 이름 입력 오류", () => {
    inputCarNames({ names: "A, BB, CCC, DDDD, EEEEE, FFFFFF" });
    cy.on("window:alert", (txt) =>
      expect(txt).to.contains(MESSAGES.INVALID_CAR_NAME)
    );
  });

  it("시도 횟수 입력", () => {
    inputCarNames({ names: "A, BB, CCC, DDDD, EEEEE" });
    inputGoalCount({ count: "3" });
  });

  it("시도 횟수 입력 오류", () => {
    inputCarNames({ names: "A, BB, CCC, DDDD, EEEEE" });
    inputGoalCount({ count: "0" });
    cy.on("window:alert", (txt) =>
      expect(txt).to.contains(MESSAGES.INVALID_GOAL_COUNT)
    );
  });

  it("게임 진행", () => {
    startGame({ names: "A, BB, CCC, DDDD, EEEEE", count: "3" });
  });

  it("다시 시작하기", () => {
    startGame({ names: "A, BB, CCC, DDDD, EEEEE", count: "3" });
    restart();
    startGame({ names: "AAAAA, BBBB, CCC, DD, E", count: "2" });
  });
});
