import { ERROR_MESSAGE, CONGRATS_MESSAGE } from "../../src/js/constants.js";

const onNameSubmit = (name = "가, 나, 다, 라") => {
  cy.get("#names").type(name);
  cy.get("#names > button").click();
};

const onTimesSubmit = (times = 4) => {
  cy.get("#times").type(times);
  cy.get("#times > button").click();
};

const checkAlertMessage = message => {
  cy.on("window:alert", txt => {
    expect(txt).to.contains(message);
    return true;
  });
};

describe("Test Game", () => {
  beforeEach("visits the form", () => {
    cy.visit("/");
    cy.clock();
  });

  it("자동차에 이름을 부여할 수 있다. 자동차 이름은 쉼표(,)를 기준으로 구분하여 등록한다. 자동차 이름은 5자 이하만 가능하다.", () => {
    cy.get("#names").type("다섯글자이상");
    checkAlertMessage(ERROR_MESSAGE.NAME_LENGTH_ERROR);
    cy.get("#names > input").clear();
    onNameSubmit();
  });

  it("사용자는 몇 번의 이동을 할 것인지를 입력할 수 있어야 한다. 이동 회수는 1 이상이어야 한다.", () => {
    onNameSubmit("가, 나, 다, 라");
    onTimesSubmit(0);
    checkAlertMessage(ERROR_MESSAGE.TIMES_ERROR);
    onTimesSubmit(5);
  });

  it("전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.", () => {
    const carNames = ["1번", "2번", "3번"];
    onNameSubmit(carNames.join(","));
    onTimesSubmit();
    cy.get("#nameCards").should("be.visible");
    carNames.forEach(name => {
      cy.get(`.mr-2[data-name=${name}]`).should("contain.text", name);
    });
  });

  it("자동차 경주 게임을 완료한 후, 우승자 알림 컴포넌트가 뜨고, 2초 후 축하 알림이 뜬다", () => {
    onNameSubmit();
    onTimesSubmit();
    cy.get("#winner").should("be.visible");
    cy.tick(2000).then(() => {
      checkAlertMessage(CONGRATS_MESSAGE);
    });
  });
});
