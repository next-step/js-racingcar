import { MESSAGE } from "../../src/js/util/constant.js";
describe("racingCar", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080");
  });
  const setAlert = () => {
    cy.window().then((win) => cy.stub(win, "alert").as("windowAlert"));
  };

  const insertCarNames = (str = "A,B,C,D") => {
    cy.get("#carNameBox>input").type(str).get("#carNameBox>button").click();
  };

  const insertAttemptCount = (count = 7) => {
    cy.get("#attemptCountBox>input")
      .type(count)
      .get("#attemptCountBox>button")
      .click();
  };

  const checkIsExistCars = (str = "A,B,C,D") => {
    const cars = str.split(",");
    cars.forEach((car) => {
      cy.get(".car-player").contains(car).should("exist");
    });
  };

  describe("input", () => {
    it("자동차 이름은 이름은 1자 이상, 5자 이하만 가능하다.", () => {
      const str = "AAAAAA,B,C";

      setAlert();
      insertCarNames(str);

      cy.get("@windowAlert").should(
        "be.calledWith",
        MESSAGE.INVALID_CARNAME_LENGTH
      );
    });

    it("자동차 이름은 공백일 수 없다.", () => {
      const str = "A,  ,B,C";

      setAlert();
      insertCarNames(str);

      cy.get("@windowAlert").should(
        "be.calledWith",
        MESSAGE.BLANK_CARNAME_INPUT
      );
    });

    it("사용자는 몇 번의 이동을 할 것인지를 15회 이하로 입력해야한다.", () => {
      const count = 16;
      setAlert();
      insertCarNames();
      insertAttemptCount(count);

      cy.get("@windowAlert").should(
        "be.calledWith",
        MESSAGE.BLANK_CARNAME_INPUT
      );
    });
  });
  describe("display", () => {
    it("자동차에 이름을 부여할 수 있다. 전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.", () => {
      insertCarNames();
      checkIsExistCars();
    });

    // it("자동차 경주 게임의 턴이 진행 될 때마다 1초의 텀(progressive 재생)을 두고 진행한다.", () => {});
  });
  discribe("result", () => {
    it("자동차 경주 게임을 완료한 후 누가 우승했는지를 알려준다. 우승자는 한 명 이상일 수 있다.", () => {
      insertCarNames();
      insertAttemptCount();
    });

    it("우승자가 여러명일 경우 ,를 이용하여 구분한다.", () => {});

    it("정상적으로 게임의 턴이 다 동작된 후에는 결과를 보여주고, 2초 후에 축하의 alert 메세지를 띄운다.", () => {});
  });
});
