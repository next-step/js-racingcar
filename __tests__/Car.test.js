import { ERROR_MESSAGE } from "../src/constants";
import Car from "../src/models/Car";

describe("자동차 경주", () => {
  describe("자동차 객체 생성", () => {
    test("자동차에 이름을 부여할 수 있다.", () => {
      const car = new Car("pobi");
      expect(car.name).toBe("pobi");
    });
    test("자동차 이름은 5자 이하만 가능하다.", () => {
      expect(() => {
        const car = new Car("pobicronghonux");
      }).toThrow(ERROR_MESSAGE.EXCEED_MAXIMUM_NAME_LENGTH);
    });
    test("자동차의 기본 위치는 0이다.", () => {
      const car = new Car("pobi");
      expect(car.position).toBe(0);
    });
  });

  describe("레이싱 객체 생성", () => {
    test("자동차 경주는 5회로 고정하여 진행한다.", () => {});
    test("자동차가 전진하는 조건은 0에서 9 사이에서 무작위 값을 구한 후 무작위 값이 4 이상일 경우이다.", () => {});
    test("자동차 경주 게임을 완료한 후 누가 우승했는지를 알려준다. 우승자는 한 명 이상일 수 있다.", () => {});
  });

  test("랜덤 함수는 지정된 범위 내의 숫자만 반환한다.", () => {});

  test("자동차 이름을 받도록 입력을 구현한다.", () => {});
  test("자동차 이름은 쉼표(,)를 기준으로 구분한다.", () => {});
  test("사용자가 잘못된 입력 값을 작성한 경우 프로그램을 종료한다.", () => {});
  test("우승자가 여러 명일 경우 쉼표(,)를 이용하여 구분한다.", () => {});
});
