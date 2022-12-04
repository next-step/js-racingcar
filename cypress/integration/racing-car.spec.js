import RACING_GAME from "../../src/constants.js";

const $carNamesInput = "#car-names-input";
const $carNamesButton = "#car-names-button";
const $racingCountInput = "#racing-count-input";
const $racingCountButton = "#racing-count-button";

describe("레이싱 게임", () => {
  let alertStub;

  const whenTargetClicked = (target, callback) => {
    cy.get(target).click().then(callback);
  };

  const alertMessageCalledWith = (message) => {
    expect(alertStub.getCall(0)).to.be.calledWith(message);
  };

  beforeEach(() => {
    cy.visit("../../index.html");
  });

  context(
    "자동차명이 올바르게 입력되지 않은 경우 에러메시지가 노출된다.",
    () => {
      beforeEach(() => {
        alertStub = cy.stub();
        cy.on("window:alert", alertStub);
      });

      it("자동차명은 공백일 수 없다.", () => {
        cy.get($carNamesInput).type("{backspace}");

        whenTargetClicked($carNamesButton, () => {
          alertMessageCalledWith(RACING_GAME.MESSAGES.CAR_NAMES_MISMATCH);
        });
      });
      it("자동차 명은 1자 이상이다.", () => {
        cy.get($carNamesInput).type("1, 1, ,");

        whenTargetClicked($carNamesButton, () => {
          alertMessageCalledWith(RACING_GAME.MESSAGES.CAR_NAMES_MISMATCH);
        });
      });

      it("자동차 명은 5자 이하이다.", () => {
        cy.get($carNamesInput).type("123456");

        whenTargetClicked($carNamesButton, () => {
          alertMessageCalledWith(RACING_GAME.MESSAGES.CAR_NAMES_MISMATCH);
        });

        cy.get($carNamesInput).type("1234, 123456");
        whenTargetClicked($carNamesButton, () => {
          alertMessageCalledWith(RACING_GAME.MESSAGES.CAR_NAMES_MISMATCH);
        });
      });

      it("자동차명은 중복되어서는 안된다.", () => {});

      it("특이 케이스 테스트", () => {
        cy.get($carNamesInput).type(",12,23");
        whenTargetClicked($carNamesButton, () => {
          alertMessageCalledWith(RACING_GAME.MESSAGES.CAR_NAMES_MISMATCH);
        });

        cy.get($carNamesInput).type("12,23,");
        whenTargetClicked($carNamesButton, () => {
          alertMessageCalledWith(RACING_GAME.MESSAGES.CAR_NAMES_MISMATCH);
        });

        cy.get($carNamesInput).type(",,");
        whenTargetClicked($carNamesButton, () => {
          alertMessageCalledWith(RACING_GAME.MESSAGES.CAR_NAMES_MISMATCH);
        });
      });
    }
  );

  context("사용자는 몇 번 이동할지 횟수를 입력한다.", () => {
    beforeEach(() => {
      alertStub = cy.stub();
      cy.on("window:alert", alertStub);

      cy.get($carNamesInput).type("123");
      cy.get($carNamesButton).click();
    });

    it("최소 1 이상의 숫자를 입력해야 한다.", () => {
      cy.get($racingCountInput).type("{backspace}");
      whenTargetClicked($racingCountButton, () => {
        alertMessageCalledWith(RACING_GAME.MESSAGES.RACING_COUNT_MISMATCH);
      });

      cy.get($racingCountInput).type("0");
      whenTargetClicked($racingCountButton, () => {
        alertMessageCalledWith(RACING_GAME.MESSAGES.RACING_COUNT_MISMATCH);
      });
    });
    it("최대 10까지 입력할 수 있다.", () => {
      cy.get($racingCountInput).type("11");
      whenTargetClicked($racingCountButton, () => {
        alertMessageCalledWith(RACING_GAME.MESSAGES.RACING_COUNT_MISMATCH);
      });
    });
  });

  context("자동차를 등록하면 등록한 자동차명이 노출된다.", () => {
    it("자동차명이 (감자, 고구마)인 경우", () => {
      cy.get($carNamesInput).type("감자, 고구마");
      cy.get($carNamesButton).click();
      cy.get($racingCountInput).type("5");
      cy.get($racingCountButton).click();

      cy.get(`#car-name-감자`).should("exist");
      cy.get(`#car-name-고구마`).should("exist");
    });
    it("자동차명에 공백이 있는 경우 제거한다.", () => {
      cy.get($carNamesInput).type("    감자    ,  고구마 ");
      cy.get($carNamesButton).click();
      cy.get($racingCountInput).type("5");
      cy.get($racingCountButton).click();

      cy.get(`#car-name-감자`).should("exist");
      cy.get(`#car-name-고구마`).should("exist");
    });
  });
});
