import { ERROR_MESSAGES } from "../../src/js/utils/constants";

const $SUBMIT_CAR_NAME_BUTTON_SELECTOR = "#submit-car-name-button";
const $CAR_NAME_INPUT_SELECTOR = "#car-name-input";
describe("레이싱 경주 테스트", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it(" 자동차에 이름을 부여할 수 있는 Input이 존재한다.", () => {
    cy.get($CAR_NAME_INPUT_SELECTOR).should("exist");
  });

  describe("자동차 이름을 부여할 수 있다.", () => {
    it("빈 문자를 부여하면 Alert가 뜬다", () => {
      cy.get($CAR_NAME_INPUT_SELECTOR).type(" ");
      cy.alert({
        action: () => cy.get($SUBMIT_CAR_NAME_BUTTON_SELECTOR).click(),
        message: ERROR_MESSAGES.NOT_ALLOW_EMPTY_VALUE,
      });
    });

    it("이름은 5자 이하만 가능하다.", () => {
      cy.get($CAR_NAME_INPUT_SELECTOR).type("일이삼사오");
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
        .type("cars{enter}")
        .then(() => {
          cy.get($CAR_NAME_INPUT_SELECTOR).should("be.disabled");
          cy.get($SUBMIT_CAR_NAME_BUTTON_SELECTOR).should("be.disabled");
        });
    });

    it("자동차 이름을 올바르게 입력 후 확인 버튼 클릭 시 자동차 이름 입력 영역의 Input과 Button이 비활성화된다.", () => {
      cy.get($CAR_NAME_INPUT_SELECTOR).type("cars");

      cy.get($SUBMIT_CAR_NAME_BUTTON_SELECTOR)
        .click()
        .then(() => {
          cy.get($CAR_NAME_INPUT_SELECTOR).should("be.disabled");
          cy.get($SUBMIT_CAR_NAME_BUTTON_SELECTOR).should("be.disabled");
        });
    });
  });

  describe("사용자는 몇 번의 이동을 할 것인지를 입력할 수 있어야 한다.", () => {
    it("이동 횟수를 입력할 수 있는 Input이 존재한다.", () => {});
    it("Input에는 숫자만 입력이 가능하다.", () => {});
    it("숫자를 제외한 문자 입력시 Alert가 뜬다.", () => {});
    it("빈 문자 입력시 Alert가 뜬다", () => {});
    it("Enter Key로 등록이 가능하다", () => {});
    it("확인 버튼 클릭시 등록이 가능하다", () => {});
    it("등록이 완료되면 Input은 수정이 불가능하다.", () => {});
    it("등록이 완료되면 확인 버튼 클릭이 불가능하다.", () => {});
  });

  describe("자동차는 사용자가 입력한 횟수 내로 랜덤하게 이동할 수 있다.", () => {
    it("자동차가 출력된다.", () => {});
    it("자동차 이름은 쉼표(,)를 기준으로 구분한다.", () => {});
    it("자동차 이름이 출력된다.", () => {});
    it("4이상의 값이 입력되면 해당 카운트에 전진한다", () => {});
    it("3이하의 값이 입력되면 해당 카운트에는 정지한다", () => {});
  });

  describe("사용자가 정한 횟수가 지나면 종료된다.", () => {
    it("최종 우승 자동차의 이름이 화면에 노출된다.", () => {});
    it("축하 Alert가 노출된다.", () => {});
  });

  describe("다시 시작할 수 있다.", () => {
    it("다시 시작하기 버튼이 존재한다.", () => {});
    it("입력되있던 자동차 이름 등록 Input의 값이 초기화된다.", () => {});
    it("시도할 횟수를 입력할 화면이 사라진다.", () => {});
  });
});
