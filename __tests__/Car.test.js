import ValidationCheck from "../src/classes/ValidationCheck";
import RacingController from "../src/controllers/RacingController";
import RacingModel from "../src/model/RacingModel";

describe("자동차 경주 게임 테스트입니다.", () => {
  const validation = new ValidationCheck();
  const racingModel = new RacingModel();
  const racingController = new RacingController();

  test("경기 진행을 위해 자동차의 이름을 최소 2개 이상 작성해야 합니다.", () => {
    expect(() => validation.validateCarCount(["car"])).toThrow("2개 이상의 자동차를 입력해주세요.");
    expect(() => validation.validateCarCount([""])).toThrow("2개 이상의 자동차를 입력해주세요.");
  });

  test("자동차 이름은 5자 이하로 작성해야 합니다.", () => {
    expect(() => validation.validateNameLength(["carcars"])).toThrow("이름의 길이는 5자를 넘길 수 없습니다.");
  });

  test("자동차 이름은 비어있을 수 없습니다.", () => {
    expect(() => validation.validateEmptyName(["car1", "", "car2"])).toThrow("빈 값은 입력할 수 없습니다.");
    expect(() => validation.validateEmptyName(["car1", "car 2", "car2"])).toThrow("빈 값은 입력할 수 없습니다.");
    expect(() => validation.validateEmptyName(["car1", " ", "car2"])).toThrow("빈 값은 입력할 수 없습니다.");
    expect(() => validation.validateEmptyName(["car1", " car", "car2"])).toThrow("빈 값은 입력할 수 없습니다.");
  });

  test("자동차 이름은 중복될 수 없습니다.", () => {
    expect(() => validation.validateDuplicateName(["car1", "car1", "car2"])).toThrow(
      "중복되는 이름은 입력할 수 없습니다."
    );
    expect(() => validation.validateDuplicateName(["car1", "안녕", "car2", "안녕"])).toThrow(
      "중복되는 이름은 입력할 수 없습니다."
    );
  });

  test("사용자가 잘못된 값을 입력한 경우 게임은 바로 종료됩니다.", () => {});

  test("랜덤 값이 4이상이 나와야 전진할 수 있습니다.", () => {});

  test("우승자가 여러명일 때 콤마로 구분해서 출력합니다.", () => {});
});
