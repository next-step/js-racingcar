import { RandomMoveStrategy } from "../src/domain/strategies";
import { getRandom } from "../src/utils";

describe("전진 전략 테스트", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("0에서 9 사이에서 무작위 값을 구한 후 무작위 값이 4 이상일 경우 전진 조건 만족", () => {
    // given
    const randomNumber = getRandom();
    const strategy = new RandomMoveStrategy();

    // when
    const isMoveForward = randomNumber >= 4;

    // then
    expect(strategy.shouldMove(randomNumber)).toBe(isMoveForward);
  });
});
