import {
  SELECTOR,
  CAR_NAME_MAX_LENGTH,
  ERROR_MESSAGE,
} from "../../src/js/constant/index.js";
import { splitCarName } from "../../src/js/utils/textUtils.js";
import { validateCarNames } from "../../src/js/models/RacingGame.js";

const clickNameSubmitButton = () => cy.get(SELECTOR.NAME_SUBMIT_BUTTON).click();
const generateNameWithRepeat = repeat => {
  const invalidName = "멍".repeat(repeat);
  return `${invalidName},야옹,짹짹,어흥`;
};

describe("자동차 경주 게임 테스트", () => {
  beforeEach(() => {
    cy.visit(Cypress.config().baseUrl);
  });

  context("자동차 정보 입력 테스트", () => {
    it("자동차 이름은 쉼표로 구분하여 입력한다", () => {
      const NAME = "멍멍,야옹,짹짹,어흥";

      cy.get(SELECTOR.NAME_INPUT).type(NAME);
      cy.get(SELECTOR.NAME_INPUT).should($name => {
        const name = $name.val();
        const commaCount = name.match(/,/g).filter(name => name !== "").length;
        const splitNamesCount = splitCarName(name).length;
        const validCommaCount = splitNamesCount - 1;

        expect(commaCount).to.eq(validCommaCount);
      });
    });

    it(`자동차 이름은 ${CAR_NAME_MAX_LENGTH}자 이하만 가능하다`, () => {
      const inputName = generateNameWithRepeat(CAR_NAME_MAX_LENGTH + 1);

      cy.get(SELECTOR.NAME_INPUT).type(inputName);
      cy.get(SELECTOR.NAME_INPUT).should($name => {
        const name = $name.val();
        const carNames = splitCarName(name);
        expect(validateCarNames(carNames)).to.be.false;
      });
    });

    it("자동차 이름이 5자 초과인 경우 알람창이 보여진다", () => {
      const alertStub = cy.stub();
      cy.on("window:alert", alertStub);
      const inputName = generateNameWithRepeat(CAR_NAME_MAX_LENGTH + 1);

      cy.get(SELECTOR.NAME_INPUT).type(inputName);
      clickNameSubmitButton().then(() => {
        expect(alertStub).to.be.calledWith(ERROR_MESSAGE.NAME_LENGTH);
      });
    });
  });
});
