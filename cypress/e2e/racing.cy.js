import { htmlNames } from "/src/constants.js";

describe("test racingcar", () => {
  before(() => {
    cy.visit("http://127.0.0.1:5501/index.html");
  });

  context("1.첫 시작은 자동차 입력 모델만 있다", () => {
    it("처음 시작했을 때 자동차 이름 입력 외에 다른 창은 뜨지 않는다", () => {
      cy.get(htmlNames.CAR_NAME_FILEDSET).should("not.have.class", "hidden");
    });
  });
  // context("2. 첫번째 input 이 정상적으로 작동하는지 테스트한다."),
  //   () => {
  //     it("자동차에 이름을 부여할 수 있다.", () => {});
  //     it("전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.", () => {});
  //     it("자동차 이름은 쉼표(,)를 기준으로 구분하며 이름은 5자 이하만 가능하다.", () => {});
  //   };

  // context("사용자는 몇 번의 이동을 할 것인지를 입력할 수 있어야 한다."), () => {}
  // context("주어진 횟수 동안 n대의 자동차는 전진 또는 멈출 수 있다."), () => {}
  // context("전진하는 조건은 0에서 9 사이에서 random 값을 구한 후 random 값이 4 이상일 경우 전진하고, 3 이하의 값이면 멈춘다."), () => {}
});
