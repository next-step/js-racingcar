import { SELECTORS } from "/src/utils/constants/selectors.js";
import { ERROR_MESSAGES } from "/src/utils/constants/messages.js";

before(() => {
  cy.visit("http://127.0.0.1:5501/index.html");
});

beforeEach(() => {
  cy.get(SELECTORS.CAR_NAME_INPUT).clear();
  cy.get(SELECTORS.COUNT_INPUT).then(($count) => {
    if ($count.is(":visible")) {
      cy.wrap($count).clear();
    }
  });
});

describe("intro: 유저가 첫 화면을 정상적으로 볼 수 있는지 테스트한다.", () => {
  context("처음 시작했을 때", () => {
    it("자동차 이름 입력 외에 다른 창은 뜨지 않는다", () => {
      cy.get(SELECTORS.CAR_NAME_FORM).should("not.have.class", "hidden");
    });
  });
});

describe("input: 유저가 정상적으로 자동차 이름과 시도 횟수를 입력할 수 있는지 테스트한다.", () => {
  context("경기 시도 횟수를 유저가 입력했을 때", () => {
    // it("시도 횟수 input이 비어있을 경우 경고 메세지를 보낸다.", () => {
    // });
    it("시도 횟수 입력값이 1이상 10이하의 수가 아닐 경우 경고 메세지를 보낸다.", () => {
      cy.shouldShowAlert(
        "",
        SELECTORS.COUNT_INPUT,
        ERROR_MESSAGES.NUM_RANGE_ERROR
      );
    });
    it("올바른 횟수를 입력하면 경주 게임 섹션이 화면이 나타난다.", () => {
      cy.get(SELECTORS.COUNT_INPUT).then(($count) => {
        if ($count.is(":visible")) {
          $count.type("3");
          cy.get(SELECTORS.GAME_SECTION).should("not.have.class", "hidden");
        }
      });
    });
  });

  context("자동차 이름 입력창에 유저가 값을 입력했을 때,", () => {
    it("자동차 이름의 길이가 0 이하이거나 6자 이상이라면 경고 메세지가 뜬다.", () => {
      // input 에 "" 입력 (if)
      cy.shouldShowAlert(
        "123456",
        SELECTORS.CAR_NAME_INPUT,
        ERROR_MESSAGES.WORD_LENGTH_ERROR
      );
      cy.shouldShowAlert(
        "",
        SELECTORS.CAR_NAME_INPUT,
        ERROR_MESSAGES.WORD_LENGTH_ERROR
      );
    });
    //it("끝이 ','로 끝나지 않는다.(정규식 ~한 형태다)", () => {});
  });
});

describe("play: 게임이 정상적으로 실행되는지 테스트한다.", () => {
  context("두 입력값이 정상적으로 submit 되었을 때", () => {
    it("게임 실행 화면에 자동차 이름이 정상적으로 출력되는 것을 볼 수 있다.", () => {
      cy.get(SELECTORS.CAR_NAME_INPUT).type("TEST1,TEST2,TEST3,TEST4");
      cy.get(SELECTORS.CAR_NAME_FORM).submit();
      cy.get(SELECTORS.COUNT_INPUT).type(3);
      cy.get(SELECTORS.COUNT_FORM).submit();

      cy.get(SELECTORS.CAR_DIV_NAME).then(($names) => {
        if ($names.is(":visible")) {
          expect($names.first()).to.contain("TEST1");
          expect($names.eq(1)).to.contain("TEST2");
          expect($names.eq(2)).to.contain("TEST3");
          expect($names.eq(3)).to.contain("TEST4");
        }
      });
    });

    it("입력한 시도 횟수만큼만 게임이 실행되는 걸 볼 수 있다.", () => {
      cy.get(SELECTORS.CAR_NAME_INPUT).type("TEST1,TEST2");
      cy.get(SELECTORS.CAR_NAME_FORM).submit();
      cy.get(SELECTORS.COUNT_INPUT).type(3);
      cy.get(SELECTORS.COUNT_FORM).submit();

      // 이건 tdd 라기보다 bdd 다... 사용자 입장에서 생각해보자.
      // 각 car div each 돌려서 forward-icon 이 사용자가 입력한 수보다 크면 안된다.

      //trial.1
      // cy.get(SELECTORS.CAR_DIV).each(($eachName) => {
      //   cy.wrap($eachName).contains("⬇️");
      // });

      //trial.2
      cy.get(SELECTORS.CAR_DIV).each(($car) => {
        cy.wrap($car.get(SELECTORS.CAR_FORWARD_ICON)).should("have.length", 3);
      });
    });
  });
});

describe("result: 게임 결과를 정상적으로 출력하는지 테스트한다.", () => {
  context("게임이 횟수만큼 실행되었다면", () => {
    it("우승자를 알리는 결과창(모달)을 볼 수 있다.", () => {
      cy.visit("http://127.0.0.1:5501/index.html");
      cy.get(SELECTORS.CAR_NAME_INPUT).type("r,s,e");
      cy.get(SELECTORS.CAR_NAME_FORM).submit();
      cy.get(SELECTORS.COUNT_INPUT).type(3);
      cy.get(SELECTORS.COUNT_FORM).submit();
      cy.get(SELECTORS.GAME_SECTION).should("not.have.class", "hidden");
      cy.get(SELECTORS.RESULT_SECTION).should("not.have.class", "hidden");
    });
    it("결과 모달은 우승자를 가리키고 있다.", () => {});
  });
});
