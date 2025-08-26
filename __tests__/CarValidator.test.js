import { CarValidator } from "../src/domain/CarValidator";

const context = describe;

describe(CarValidator.name, () => {
  context(CarValidator.validateCarNames, () => {
    it("자동차 이름이 모두 유효하면 에러를 던지지 않는다.", () => {
      const carNames = ["외제차", "현대차", "스포츠카"];

      expect(() => CarValidator.validateCarNames(carNames)).not.toThrow();
    });
    it("유효하지 않은 이름을 가진 자동차가 있으면, 에러를 던진다.", () => {
      const carNames = ["검은색자동차", "나만의자동차", "스포츠카"];

      expect(() => CarValidator.validateCarNames(carNames)).toThrow(
        `자동차 이름을 ${CarValidator.CAR_NAME_LENGTH_MAX}자 이하로 입력해주세요.`,
      );
    });
  });

  context(CarValidator.isValidCarName, () => {
    it.each(["차", "자동차", "네모난차", "르노코리아"])(
      `자동차 이름이 최대 글자수(${CarValidator.CAR_NAME_LENGTH_MAX}) 이하면 유효한 이름이라서 true를 반환한다`,
      (carName) => {
        expect(CarValidator.isValidCarName(carName)).toBe(true);
      },
    );
    it("자동차 이름이 6글자면 유효하지 않은 이름이라서 false를 반환한다", () => {
      const carName = "현대자동차+";

      const isValid = CarValidator.isValidCarName(carName);

      expect(isValid).toBe(false);
    });
  });
});
