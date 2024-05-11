import { ERROR_MESSAGES } from "../src/constants";
import { readLineAsync } from "../src/utils";
import { View } from "../src/views";
import { Car } from "../src/domain/Car";

jest.mock("../src/utils", () => ({
  readLineAsync: jest.fn(),
}));

describe("입/출력 테스트", () => {
  let logSpy;

  beforeEach(() => {
    logSpy = jest.spyOn(console, "log");
  });

  afterEach(() => {
    readLineAsync.mockReset();
    jest.restoreAllMocks();
  });

  test("자동차를 출력할 때 쉼표(,)를 기준으로 구분하며 전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.", async () => {
    // given
    const car1 = new Car("pobi");
    const car2 = new Car("crong");
    const car3 = new Car("honux");

    // when
    View.printResult([car1, car2, car3]);

    // then
    expect(logSpy).toHaveBeenCalledWith("pobi : ");
    expect(logSpy).toHaveBeenCalledWith("crong : ");
    expect(logSpy).toHaveBeenCalledWith("honux : ");
  });

  test("우승자가 여러 명일 경우 쉼표(,)를 이용하여 구분하여 출력한다.", async () => {
    // given
    const car1 = new Car("pobi");
    const car2 = new Car("crong");
    const car3 = new Car("honux");

    // when
    View.printWinners([car1, car2, car3]);

    // then
    expect(logSpy).toHaveBeenCalledWith(
      `pobi, crong, honux가 최종 우승했습니다.`
    );
  });
});
