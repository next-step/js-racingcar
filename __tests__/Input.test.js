import Input from "../src/view/Input";
import { CAR_NAMES } from "../src/utils/constants";

describe("Input 유효성 메서드 테스트", () => {
  let input;
  beforeEach(() => {
    input = new Input();
  });

  describe("이름 안에 공백이 포함된 경우", () => {
    it("이름에 공백이 있으면 false를 반환한다.", () => {
      const validate = input.isValidNotSpace([CAR_NAMES.NAME_SPACE]);
      expect(validate).toBeFalsy();
    });

    it("이름에 공백이 없으면 true를 반환한다.", () => {
      const validate = input.isValidNotSpace([CAR_NAMES.NAME]);
      expect(validate).toBeTruthy();
    });
  });

  describe("SplitBy 메서드", () => {
    it("쉼표로 구분된 문자열을 배열로 변환한다.", () => {
      const result = input.splitBy("G70,GV80,NEXT_STEP", ",");
      expect(result).toEqual([CAR_NAMES.G70, CAR_NAMES.GV80, CAR_NAMES.NEXT_STEP]);
    });

    it("-로 구분된 문자열을 배열로 변환한다.", () => {
      const result = input.splitBy("G70-GV80-NEXT_STEP", "-");
      expect(result).toEqual([CAR_NAMES.G70, CAR_NAMES.GV80, CAR_NAMES.NEXT_STEP]);
    });

    it("이름의 앞 뒤 공백을 제거하고 배열로 변환한다.", () => {
      const result = input.splitBy("     G70,GV80     ,    NEXT_STEP    ", ",");
      expect(result).toEqual([CAR_NAMES.G70, CAR_NAMES.GV80, CAR_NAMES.NEXT_STEP]);
    });
  });

  describe("경주 횟수 입력 유효성 검사", () => {
    it("사용자가 양수를 입력하면 true를 반환한다.", () => {
      const result = input.isValidInteger(1);
      expect(result).toBeTruthy();
    });

    describe("사용자가 양수가 아닌", () => {
      it("0 입력 시 false를 반환한다.", () => {
        const result = input.isValidInteger(0);
        expect(result).toBeFalsy();
      });

      it("음수 입력 시 false를 반환한다.", () => {
        const result = input.isValidInteger(-1);
        expect(result).toBeFalsy();
      });

      it("유리수 입력 시 false를 반환한다.", () => {
        const result = input.isValidInteger(1.11);
        expect(result).toBeFalsy();
      });

      it("String 입력 시 false를 반환한다.", () => {
        const result = input.isValidInteger("일");
        expect(result).toBeFalsy();
      });
    });
  });
});
