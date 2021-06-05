import { BASE_URL } from "../constants/base.js";
import {
  CAR_FORM,
  TIME_FORM,
  NAME_INPUT,
  TIME_INPUT,
  CAR_RACE,
  RESULT,
  CAR,
} from "../constants/selectors.js";
import { INTERVAL_TIME } from "../constants/numbers.js";
import {
  NOT_ALLOWED_NAME_ERROR,
  NOT_ALLOWED_TIME_ERROR,
} from "../constants/texts.js";
import { setUpCarRace, nameDatas, timeDatas } from "../_testUtils/index.js";

describe("자동차 경주", () => {
  beforeEach(() => {
    cy.visit(BASE_URL);
  });

  describe("자동차 이름을 입력받는 폼", () => {
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

  describe("경주 횟수를 입력받는 폼", () => {
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

  describe("자동차 경주 컴포넌트", () => {
    it(",를 기준으로 이름을 렌더링해준다.", () => {});
  });

  describe("자동차 경주 결과 컴포넌트", () => {});

  describe("초기화 버튼", () => {});
});
