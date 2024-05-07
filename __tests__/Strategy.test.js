import { RandomMoveStrategy } from "../src/domain/strategies";
import { getRandom } from "../src/utils";

jest.mock("../src/utils", () => ({
  getRandom: jest.fn(),
}));

describe("전진 전략 테스트", () => {
  afterEach(() => {
    getRandom.mockReset();
  });

  test("0에서 9 사이에서 무작위 값을 구한 후 무작위 값이 4 이상일 경우 전진 조건 만족", () => {
    // given
    getRandom.mockReturnValue(RandomMoveStrategy.MOVE_FORWARD_CAR);

    // when + then
    expect(new RandomMoveStrategy().shouldMove()).toBe(true);
    expect(getRandom).toHaveBeenCalled();
  });
});
