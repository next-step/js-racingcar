import { SELECTORS, ERROR_MESSAGES } from "/src/constants.js";

const shouldShowAlert = (err, typeVal) => {
  cy.on("window:alert", (alertMessage) => {
    expect(alertMessage).to.eq(err);
  });
  submitForm(SELECTORS.CAR_NAME_INPUT, typeVal);
};
const submitForm = (selector, typeVal) => {
  if (typeVal) cy.get(selector).type(typeVal);
  cy.get(SELECTORS.CAR_NAME_FORM).submit();
};

describe("test racingcar", () => {
  before(() => {
    cy.visit("http://127.0.0.1:5501/index.html");
  });

  context("1.첫 시작은 자동차 입력 모델만 있다", () => {
    it("처음 시작했을 때 자동차 이름 입력 외에 다른 창은 뜨지 않는다", () => {
      cy.get(SELECTORS.CAR_NAME_FIELDSET).should("not.have.class", "hidden");
    });
  });

  context("2. 인풋을 통해 자동차에 이름을 부여할 수 있다.", () => {
    it("input의 길이가 0 이하이거나 6자 이상일 때, alert 이 뜬다.", () => {
      // input 에 "" 입력 (if)
      shouldShowAlert(ERROR_MESSAGES.WORD_LENGTH_ERROR, "123456");
      shouldShowAlert(ERROR_MESSAGES.WORD_LENGTH_ERROR, "");
    });
    it("자동차 이름을 입력하고 버튼을 클릭하면 시도 횟수 입력창이 나타난다.", () => {
      cy.get(SELECTORS.CAR_NAME_BTN).click();
      cy.get(SELECTORS.TRIAL_NUM_FIELDSET).should("not.have.class", "hidden");
    });
    it("사용자는 몇 번의 이동을 할 것인지를 입력할 수 있어야 한다.", () => {
      submitForm(SELECTORS.TRIAL_NUM_INPUT, "3");
      cy.get(SELECTORS.GAME_SECTION).should("not.have.class", "hidden");
    });
  });
  // it("전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.", () => {});
  // it("자동차 이름은 쉼표(,)를 기준으로 구분하여서 자동차 이름을 출력한다.", () => {});
  // context("주어진 횟수 동안 n대의 자동차는 전진 또는 멈출 수 있다."),
  //   () => {
  //     it(
  //       "전진하는 조건은 0에서 9 사이에서 random 값을 구한 후 random 값이 4 이상일 경우 전진하고, 3 이하의 값이면 멈춘다."
  //     ),
  //       () => {};
  //   };
});
