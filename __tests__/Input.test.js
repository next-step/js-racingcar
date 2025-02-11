import Input from "../src/view/Input";
import { carNames } from "../src/utils/constants";

describe("Input 유효성 메서드 테스트", () => {
  let input;
  beforeEach(() => {
    input = new Input();
  });

  describe("이름 안에 공백이 포함된 경우", () => {
    it("이름에 공백이 있으면 false를 반환한다.", () => {
      const validate = input.validateNotSpace([carNames.NAME_SPACE]);
      expect(validate).toBeFalsy();
    });

    it("이름에 공백이 없으면 true를 반환한다.", () => {
      const validate = input.validateNotSpace([carNames.NAME]);
      expect(validate).toBeTruthy();
    });
  });

  describe("SplitBy 메서드", () => {
    it("쉼표로 구분된 문자열을 배열로 변환한다.", () => {
      const result = input.splitBy("G70,GV80,NEXTSTEP", ",");
      expect(result).toEqual([carNames.G70, carNames.GV80, carNames.NEXTSTEP]);
    });

    it("-로 구분된 문자열을 배열로 변환한다.", () => {
      const result = input.splitBy("G70-GV80-NEXTSTEP", "-");
      expect(result).toEqual([carNames.G70, carNames.GV80, carNames.NEXTSTEP]);
    });

    it("이름의 앞 뒤 공백을 제거하고 배열로 변환한다.", () => {
      const result = input.splitBy("     G70,GV80     ,    NEXTSTEP    ", ",");
      expect(result).toEqual([carNames.G70, carNames.GV80, carNames.NEXTSTEP]);
    });
  });
});
