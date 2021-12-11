import { CLASS_NAME } from "../../src/js/constants/selectors.js";
import { ALERT_MESSAGE } from "../../src/js/constants/messages.js";
import racingCarGameStore from "../../src/js/stores/RacingCarGameStore.js";

before(() => {
  cy.visit("/");
});

describe("자동차 이름 입력", () => {
  const carNamesSuccessCase = ["a", "aa, aaa", "aaa,  aaaa", "a, aaaa, aaaaa"];
  const carNameLongerThen5 = "aaaaaa";
  const carNameStringContainsEmpty = "a,,a";
  const carNameStringContainsDuplicated = "a,a";

  it("자동차 이름을 쉼표로 구분해 입력하면 화면에 각 자동차 이름을 출력한다.", () => {
    carNamesSuccessCase.forEach((testCase) => {
      const carNames = testCase.replaceAll(/\s/g, "").split(",");

      cy.submitCarNames(testCase);
      cy.get(`.${CLASS_NAME.CAR_PLAYER}`).each(($course, index) => {
        cy.wrap($course).should("have.text", carNames[index]);
      });
    });
  });

  it("1개 이상의 자동차 이름이 5자를 초과한다면 경고를 보여준다.", () => {
    cy.submitCarNames(carNameLongerThen5);
    cy.on("window:alert", (text) => expect(text).to.contains(ALERT_MESSAGE.INVALID_CAR_NAME_LENGTH));
  });

  it("1개 이상의 자동차 이름이 1자를 미만이라면 경고를 보여준다.", () => {
    cy.submitCarNames(carNameStringContainsEmpty);
    cy.on("window:alert", (text) => expect(text).to.contains(ALERT_MESSAGE.INVALID_CAR_NAME_LENGTH));
  });

  it("중복된 자동차 이름이 존재하면 경고를 보여준다.", () => {
    cy.submitCarNames(carNameStringContainsDuplicated);
    cy.on("window:alert", (text) => expect(text).to.contains(ALERT_MESSAGE.DUPLICATE_CAR_NAME));
  });
});

describe("레이싱 게임", () => {
  const carName = "aaa";
  const tryCount = 10;

  it("레이싱 기록을 화면에 보여준다.", () => {
    cy.submitCarNames(carName);
    cy.submitTryCount(tryCount);

    const cars = racingCarGameStore.selectState((state) => state.cars);

    cars.forEach((car) => {
      cy.get(`.${CLASS_NAME.RACING_TRACK}[data-car-name="${car.name}"] > .forword-icon`).should(
        "have.length",
        car.location
      );
    });
  });
});
