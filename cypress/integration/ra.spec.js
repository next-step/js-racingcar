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
  const checkIsExistCars = (str) => {
    const cars = str.split(",");
    cars.forEach((car) => {
      cy.get(".car-player").contains(car).should("exist");
    });
  };
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

    cy.get("@windowAlert").should("be.calledWith", MESSAGE.BLANK_CARNAME_INPUT);
  });

  it("자동차에 이름을 부여할 수 있다. 전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.", () => {
    const str = "A,B,C,D";
    insertCarNames(str);
    checkIsExistCars(str);
  });
  // it("주어진 횟수 동안 n대의 자동차는 전진 또는 멈출 수 있다.", () => {});
  // it("사용자는 몇 번의 이동을 할 것인지를 입력할 수 있어야 한다.", () => {});
  // it("전진 조건은 0에서 9 사이에서 random 값을 구한 후 random 값이 4 이상일 경우 전진하고, 3 이하의 값이면 멈춘다.", () => {});
  // it("자동차 경주 게임을 완료한 후 누가 우승했는지를 알려준다. 우승자는 한 명 이상일 수 있다.", () => {});
  // it("우승자가 여러명일 경우 ,를 이용하여 구분한다.", () => {});
  // it("자동차 경주 게임의 턴이 진행 될 때마다 1초의 텀(progressive 재생)을 두고 진행한다.", () => {});
  // it("애니메이션 구현을 위해 setInterval, setTimeout, requestAnimationFrame 을 활용한다.", () => {});
  // it("정상적으로 게임의 턴이 다 동작된 후에는 결과를 보여주고, 2초 후에 축하의 alert 메세지를 띄운다.", () => {});
  // it("위 기능들이 정상적으로 동작하는지 Cypress를 이용해 테스트한다.", () => {});
});
