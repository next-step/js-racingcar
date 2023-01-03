import {
  $ATTEMPT_COUNT_INPUT_SELECTOR,
  $CAR_COUNT_SETTING_FORM_SELECTOR,
  $CAR_NAME_INPUT_SELECTOR,
  $CAR_SELECTOR,
  $RESTART_BUTTON_SELECTOR,
  $SUBMIT_ATTEMPT_COUNT_BUTTON_SELECTOR,
  $SUBMIT_CAR_NAME_BUTTON_SELECTOR,
  $WINNER_INFO_SELECTOR,
  ATTEMPT_COUNT,
  CONGRATULATORY_MESSAGE,
  DELAY_MILLISECONDS,
  ERROR_MESSAGES,
  WRITING_CAR_NAME,
  WRITING_CAR_NAMES,
} from "../support/constant.js";

describe("레이싱 경주 테스트", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it(" 자동차에 이름을 부여할 수 있는 Input이 존재한다.", () => {
    cy.get($CAR_NAME_INPUT_SELECTOR).should("exist");
  });

  context("자동차 이름을 부여할 수 있다.", () => {
    it("빈 문자를 부여하면 Alert가 뜬다", () => {
      cy.get($CAR_NAME_INPUT_SELECTOR).type(" ");
      cy.alert({
        action: () => cy.get($SUBMIT_CAR_NAME_BUTTON_SELECTOR).click(),
        message: ERROR_MESSAGES.NOT_ALLOW_EMPTY_VALUE,
      });
    });

    it("이름은 5자 이하만 가능하다.", () => {
      cy.get($CAR_NAME_INPUT_SELECTOR).type("일이삼사오육");
      cy.alert({
        action: () => cy.get($SUBMIT_CAR_NAME_BUTTON_SELECTOR).click(),
        message: ERROR_MESSAGES.NOT_ALLOW_NAME_LENGTH,
      });
    });

    describe("이름은 영,한자만 입력 가능하다.", () => {
      it("숫자를 입력했을 경우 Alert가 뜬다", () => {
        cy.get($CAR_NAME_INPUT_SELECTOR).type("1234");
        cy.alert({
          action: () => cy.get($SUBMIT_CAR_NAME_BUTTON_SELECTOR).click(),
          message: ERROR_MESSAGES.NOT_ALLOW_NAME_TYPE,
        });
      });

      it("특수문자를 입력했을 경우 Alert가 뜬다", () => {
        cy.get($CAR_NAME_INPUT_SELECTOR).type("!@#$");
        cy.alert({
          action: () => cy.get($SUBMIT_CAR_NAME_BUTTON_SELECTOR).click(),
          message: ERROR_MESSAGES.NOT_ALLOW_NAME_TYPE,
        });
      });
    });

    it("자동차 이름을 올바르게 입력 후 Enter Key 입력 시 자동차 이름 입력 영역의 Input과 Button이 비활성화된다.", () => {
      cy.get($CAR_NAME_INPUT_SELECTOR)
        .type(`${WRITING_CAR_NAME}{enter}`)
        .then(() => {
          cy.get($CAR_NAME_INPUT_SELECTOR).should("be.disabled");
          cy.get($SUBMIT_CAR_NAME_BUTTON_SELECTOR).should("be.disabled");
        });
    });

    it("자동차 이름을 올바르게 입력 후 확인 버튼 클릭 시 자동차 이름 입력 영역의 Input과 Button이 비활성화된다.", () => {
      cy.get($CAR_NAME_INPUT_SELECTOR).type(WRITING_CAR_NAME);

      cy.get($SUBMIT_CAR_NAME_BUTTON_SELECTOR)
        .click()
        .then(() => {
          cy.get($CAR_NAME_INPUT_SELECTOR).should("be.disabled");
          cy.get($SUBMIT_CAR_NAME_BUTTON_SELECTOR).should("be.disabled");
        });
    });
  });

  context("사용자는 몇 번의 이동을 할 것인지를 입력할 수 있어야 한다.", () => {
    beforeEach(() => {
      cy.get($CAR_NAME_INPUT_SELECTOR).type(`${WRITING_CAR_NAME}{enter}`);
    });

    it("이동 횟수를 입력할 수 있는 영역이 존재한다.", () => {
      cy.get($CAR_COUNT_SETTING_FORM_SELECTOR).should("have.class", "active");
    });

    it("Input에는 1이상의 숫자만 입력이 가능하다.", () => {
      cy.get($CAR_COUNT_SETTING_FORM_SELECTOR).type("0");
      cy.alert({
        action: () => cy.get($SUBMIT_ATTEMPT_COUNT_BUTTON_SELECTOR).click(),
        message: ERROR_MESSAGES.NOT_ALLOW_COUNT,
      });
    });

    it("빈 문자 입력시 Alert가 뜬다", () => {
      cy.get($CAR_COUNT_SETTING_FORM_SELECTOR).type("{enter}");
      cy.alert({
        action: () => cy.get($SUBMIT_ATTEMPT_COUNT_BUTTON_SELECTOR).click(),
        message: ERROR_MESSAGES.NOT_ALLOW_COUNT,
      });
    });

    it("자동차 이름을 올바르게 입력 후 Enter Key 입력 시 자동차 이름 입력 영역의 Input과 Button이 비활성화된다.", () => {
      cy.get($ATTEMPT_COUNT_INPUT_SELECTOR)
        .type("1{enter}")
        .then(() => {
          cy.get($ATTEMPT_COUNT_INPUT_SELECTOR).should("be.disabled");
          cy.get($SUBMIT_ATTEMPT_COUNT_BUTTON_SELECTOR).should("be.disabled");
        });
    });

    it("자동차 이름을 올바르게 입력 후 확인 버튼 클릭 시 자동차 이름 입력 영역의 Input과 Button이 비활성화된다.", () => {
      cy.get($ATTEMPT_COUNT_INPUT_SELECTOR).type("2");

      cy.get($SUBMIT_ATTEMPT_COUNT_BUTTON_SELECTOR)
        .click()
        .then(() => {
          cy.get($ATTEMPT_COUNT_INPUT_SELECTOR).should("be.disabled");
          cy.get($SUBMIT_ATTEMPT_COUNT_BUTTON_SELECTOR).should("be.disabled");
        });
    });
  });

  context("자동차는 사용자가 입력한 횟수 내로 랜덤하게 이동할 수 있다.", () => {
    it("자동차가 출력된다.", () => {
      cy.enteredRacingOption({
        carNames: WRITING_CAR_NAME,
        attemptCount: ATTEMPT_COUNT,
      });

      cy.contains(WRITING_CAR_NAME).should("have.length", 1);
    });

    it("자동차 이름은 쉼표(,)를 기준으로 구분한다.", () => {
      const carsLength = WRITING_CAR_NAMES.split(",").length;

      cy.enteredRacingOption({
        carNames: WRITING_CAR_NAMES,
        attemptCount: ATTEMPT_COUNT,
      });

      cy.get($CAR_SELECTOR).should("have.length", carsLength);
    });

    it("자동차 이동 횟수는 입력된 시도할 횟수보다 클 수 없다.", () => {
      cy.clock();

      cy.enteredRacingOption({
        carNames: WRITING_CAR_NAMES,
        attemptCount: ATTEMPT_COUNT,
      });

      cy.tick(ATTEMPT_COUNT * DELAY_MILLISECONDS);

      cy.get($CAR_SELECTOR).each(($el) => {
        const forwardLength = $el.children(".forward-icon").length;
        expect(forwardLength).most(ATTEMPT_COUNT);
      });
    });
  });

  context("사용자자가 정한 횟수가 지나면 종료된다.", () => {
    it("최종 우승 자동차의 이름이 화면에 노출된다.", () => {
      cy.clock();
      cy.enteredRacingOption({
        carNames: WRITING_CAR_NAMES,
        attemptCount: ATTEMPT_COUNT,
      });
      cy.tick(ATTEMPT_COUNT * DELAY_MILLISECONDS);
      cy.get($WINNER_INFO_SELECTOR).should("be.visible");
    });

    it("축하 Alert가 노출된다.", () => {
      cy.alert({
        action: () => {
          cy.clock();
          cy.enteredRacingOption({
            carNames: WRITING_CAR_NAMES,
            attemptCount: ATTEMPT_COUNT,
          });
          cy.tick(ATTEMPT_COUNT * DELAY_MILLISECONDS + DELAY_MILLISECONDS);
          return cy.tick(2000);
        },
        message: CONGRATULATORY_MESSAGE,
      });
    });
  });

  context("다시 시작할 수 있다.", () => {
    beforeEach(() => {
      cy.clock();
      cy.enteredRacingOption({
        carNames: WRITING_CAR_NAMES,
        attemptCount: ATTEMPT_COUNT,
      });
      cy.tick(ATTEMPT_COUNT * DELAY_MILLISECONDS);
    });
    it("다시 시작하기 버튼이 존재한다.", () => {
      cy.get($RESTART_BUTTON_SELECTOR).should("be.visible");
    });
    it("입력되있던 자동차 이름 등록 Input의 값이 초기화된다.", () => {
      cy.get($RESTART_BUTTON_SELECTOR).should("be.visible").click();
      cy.get($CAR_NAME_INPUT_SELECTOR).should("have.value", "");
      cy.get($SUBMIT_CAR_NAME_BUTTON_SELECTOR).should(
        "not.have.attr",
        "disabled"
      );
    });
    it("시도할 횟수를 입력할 화면이 사라진다.", () => {
      cy.get($RESTART_BUTTON_SELECTOR).should("be.visible").click();
      cy.get($CAR_COUNT_SETTING_FORM_SELECTOR).should("not.be.visible");
    });
  });
});
