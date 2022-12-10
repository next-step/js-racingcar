import RACING_GAME from "../../src/constants.js";
import Car from "../../src/models/Car.js";

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

      it("자동차명이 공백인 경우", () => {
        cy.get($carNamesInput).type("{backspace}");

        whenTargetClicked($carNamesButton, () => {
          alertMessageCalledWith(RACING_GAME.MESSAGES.CAR_NAMES_MISMATCH);
        });
      });
      it("자동차명은 공백 혹은 빈 문자열만 입력된 경우", () => {
        cy.get($carNamesInput).type("1, 1, ,");

        whenTargetClicked($carNamesButton, () => {
          alertMessageCalledWith(RACING_GAME.MESSAGES.CAR_NAMES_MISMATCH);
        });
      });

      it("자동차명이 6자 이상 입력된 경우", () => {
        cy.get($carNamesInput).type("123456");

        whenTargetClicked($carNamesButton, () => {
          alertMessageCalledWith(RACING_GAME.MESSAGES.CAR_NAMES_MISMATCH);
        });

        cy.get($carNamesInput).type("1234, 123456");
        whenTargetClicked($carNamesButton, () => {
          alertMessageCalledWith(RACING_GAME.MESSAGES.CAR_NAMES_MISMATCH);
        });
      });

      it("그 외에 예외 케이스들", () => {
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

  context("자동차는 random 값이 4 이상인 경우 전진 가능하다.", () => {
    const car = new Car("random");

    it("random 값이 4인 경우 전진 가능하다.", () => {
      expect(car.isMovable(4)).to.be.true;
    });
    it("random 값이 9인 경우 전진 가능하다.", () => {
      expect(car.isMovable(9)).to.be.true;
    });
    it("random 값이 0인 경우 전진 불가능하다.", () => {
      expect(car.isMovable(0)).to.be.false;
    });
    it("random 값이 3인 경우 전진 불가능하다.", () => {
      expect(car.isMovable(3)).to.be.false;
    });
  });

  /**
   * 우승차 이름 노출에 대한 테스트 코드 작성
   * 랜덤값을 컨트롤 할 수 있도록 구성해야해
   */
});
