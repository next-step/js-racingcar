import ValidationCheck from "../src/classes/ValidationCheck";
import RacingController from "../src/controllers/RacingController";
import RacingModel from "../src/model/RacingModel";
import { createRandomValue, readlineInterface } from "../src/utils/util";

describe("자동차 경주 게임 테스트입니다.", () => {
  const validation = new ValidationCheck();
  const racingModel = new RacingModel();
  const racingController = new RacingController();

  test("자동차 이름은 5자 이하로 작성해야 합니다.", () => {
    const carNames = ["car1", "car2", "car3", "toolongname"];
    expect(() => validation.validateNameLength(carNames)).toThrow("이름의 길이는 5자를 넘길 수 없습니다.");
  });

  test("자동차 이름은 비어있을 수 없습니다.", () => {});

  test("자동차 이름은 중복될 수 없습니다.", () => {});

  test("경기 진행을 위해 자동차의 이름을 최소 2개 이상 작성해야 합니다.", () => {});

  test("사용자가 잘못된 값을 입력한 경우 게임은 바로 종료됩니다.", () => {});

  test("랜덤 값이 4이상이 나와야 전진할 수 있습니다.", () => {});

  test("우승자가 여러명일 때 콤마로 구분해서 출력합니다.", () => {});
});
