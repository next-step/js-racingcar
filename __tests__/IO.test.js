import { splitNamesByComma } from "../src/utils/IO";

describe("입출력 테스트", () => {
  test("자동차의 이름은 쉼표(,)를 기준으로 구분", () => {
    // given
    const CAR_NAMES = "pobi,crong,honux";

    // when
    const splittedNames = splitNamesByComma(CAR_NAMES);

    // then
    expect(splittedNames).toEqual(["pobi", "crong", "honux"]);
  });
});
