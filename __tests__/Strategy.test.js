import { RandomMoveStrategy } from "../src/domain/strategies";
import * as utils from "../src/utils/getRandom";

describe("전진 전략 테스트", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("0에서 9 사이에서 무작위 값을 구한 후 무작위 값이 4 이상일 경우 전진 조건 만족", () => {
    // given
    jest
      .spyOn(utils, "getRandom")
      .mockReturnValue(RandomMoveStrategy.MOVE_FORWARD_CAR);

    // when + then
    expect(new RandomMoveStrategy().shouldMove()).toBe(true);
    expect(utils.getRandom).toHaveBeenCalled();
  });
});
