import { BASE_URL } from "../constants/base.js";
import {
  CAR_FORM,
  TIME_FORM,
  NAME_INPUT,
  TIME_INPUT,
  CAR_RACE,
  RESULT,
  INIT_BUTTON,
} from "../constants/selectors.js";
import { INTERVAL_TIME, ALERT_DELAY_TIME } from "../constants/numbers.js";
import {
  NOT_ALLOWED_NAME_ERROR,
  NOT_ALLOWED_TIME_ERROR,
  WIN_MESSAGE,
} from "../constants/texts.js";
import { setUpCarRace } from "../_testUtils/index.js";

describe("자동차 경주", () => {
  beforeEach(() => {
    cy.visit(BASE_URL);
  });

  context("자동차 이름을 입력받는 폼", () => {
    it("다섯글자가 넘는 자동차 이름에 대해 알림을 띄운다.", () => {
      const alertStub = cy.stub();
      cy.get(NAME_INPUT).type("짱구, 짱구훈이유리");
      cy.on("window:alert", alertStub);
      cy.get(CAR_FORM)
        .submit()
        .then(() => {
          const actualMessage = alertStub.getCall(0).lastArg;
          expect(actualMessage).to.equal(NOT_ALLOWED_NAME_ERROR);
        });
    });

    it("한글자 미만 자동차 이름에 대해 알림을 띄운다.", () => {
      const alertStub = cy.stub();
      cy.get(NAME_INPUT).type(", 짱구");
      cy.on("window:alert", alertStub);
      cy.get(CAR_FORM)
        .submit()
        .then(() => {
          const actualMessage = alertStub.getCall(0).lastArg;
          expect(actualMessage).to.equal(NOT_ALLOWED_NAME_ERROR);
        });
    });
    it("유효한 자동차 이름을 입력했을 경우, 시간을 입력하는 폼이 렌더링된다.", () => {
      cy.get(NAME_INPUT).type("짱구, 훈이, 유리");
      cy.get(CAR_FORM).submit();
      cy.get(TIME_FORM).should("be.visible");
    });
  });

  context("경주 횟수를 입력받는 폼", () => {
    beforeEach(() => {
      cy.get(NAME_INPUT).type("짱구, 훈이, 유리");
      cy.get(CAR_FORM).submit();
    });

    it("경주 횟수를 0으로 설정했을 경우 알림을 띄워준다.", () => {
      const alertStub = cy.stub();
      cy.get(TIME_INPUT).type(0);
      cy.on("window:alert", alertStub);
      cy.get(TIME_FORM)
        .submit()
        .then(() => {
          const actualMessage = alertStub.getCall(0).lastArg;
          expect(actualMessage).to.equal(NOT_ALLOWED_TIME_ERROR);
        });
    });

    it("올바른 경주 횟수를 입력했을 경우 카 레이싱 컴포넌트를 렌더링해준다.", () => {
      cy.get(TIME_INPUT).type(1);
      cy.get(TIME_FORM).submit();
      cy.get(CAR_RACE).should("be.visible");
    });
  });

  context("자동차 경주 컴포넌트", () => {
    it("콤마를 기준으로 이름을 렌더링해준다.", () => {
      const names = ["짱구", "유리", "철수"];
      setUpCarRace(names.join(","));
      names.forEach((name) => {
        cy.get(`[data-name=${name}]`).should("have.text", name);
      });
    });
  });

  context("자동차 경주 결과 컴포넌트", () => {
    beforeEach(() => {
      setUpCarRace();
    });

    it("정해진 시간 이후에 결과 컴포넌트가 렌더링 된다.", () => {
      cy.clock();
      cy.tick(INTERVAL_TIME * 3 + INTERVAL_TIME);
      cy.get(RESULT).should("be.visible");
    });

    it("결과 컴포넌트가 렌더링 되고 2초 후에 축하 알림이 뜬다.", () => {
      const alertStub = cy.stub();
      cy.on("window:alert", alertStub);
      cy.clock();
      cy.tick(INTERVAL_TIME * 3 + INTERVAL_TIME);
      cy.get(RESULT).should("be.visible");
      cy.tick(ALERT_DELAY_TIME).then(() => {
        const actualMessage = alertStub.getCall(0).lastArg;
        expect(actualMessage).to.equal(WIN_MESSAGE);
      });
    });
  });

  context("초기화 버튼", () => {
    beforeEach(() => {
      setUpCarRace();
    });
    it("초기화 버튼을 누르기 전", () => {
      cy.get(NAME_INPUT).should("be.disabled");
      cy.get(TIME_INPUT).should("be.disabled");
    });
    it("초기화 버튼을 누르면 모든 정보가 리셋된다.", () => {
      cy.get(INIT_BUTTON).click();
      cy.get(NAME_INPUT).should("not.be.disabled");
      cy.get(NAME_INPUT).should("have.value", "");
      cy.get(TIME_INPUT).should("not.be.visible");
      cy.get(TIME_INPUT).should("not.be.disabled");
      cy.get(TIME_INPUT).should("have.value", "");
      cy.get(CAR_RACE).should("not.be.visible");
      cy.get(RESULT).should("not.be.visible");
    });
  });
});
