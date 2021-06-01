import { ERROR_MESSAGE, WINNING_MASSAGE } from "../../src/js/utils/constnats";
import * as utils from "../../src/js/utils/utils.js";
import Car from "../../src/js/domain/Car.js";

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

  // 랜덤에 의지한 좋지 못한 테스트
  context("게임 진행 시", () => {
    it("1초 이후에 forward 아이콘이 생긴다", () => {
      setGame("a,b,c,d,e,f,g,h,i,j,k", 1);
      cy.get(".forward-icon").should("not.exist");
      cy.wait(1000);
      cy.get(".forward-icon").should("exist");
    });
  });

  context("게임 종료 시", () => {
    it("우승자 이름을 출력한다.", () => {
      setGame("a", 1);
      cy.get(".winner-list").should("contain.text", "a");
    });

    it("2초 뒤에 alert창으로 축하한다.", () => {
      cy.window().then((window) => cy.stub(window, "alert").as("alert"));

      setGame("a", 1);

      cy.get("@alert").should("not.be.called");
      cy.wait(2000);
      cy.get("@alert").should("be.calledWith", WINNING_MASSAGE);
    });
  });

  context("다시 시작하기 버튼 클릭 시", () => {
    it("초기화면으로 돌아간다", () => {
      setGame("a", 1);

      cy.get(".reset-btn").click();

      cy.get(".car-list").should("not.contain.text", "a");
      cy.get(".winner-list").should("not.contain.text", "a");
    });
  });
});

describe("Car class", () => {
  context("race 함수 실행 시", () => {
    it("랜덤값이 4 이상이면 position이 1 증가한다.", () => {
      cy.stub(utils, "generateRandom").returns(4);

      const car = new Car("test");

      expect(car.position).eq(0);
      car.race();
      expect(car.position).eq(1);
    });

    it("랜덤값이 3 이하면 position이 1 증가한다.", () => {
      cy.stub(utils, "generateRandom").returns(3);

      const car = new Car("test");

      expect(car.position).eq(0);
      car.race();
      expect(car.position).eq(0);
    });
  });
});
