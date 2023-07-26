import ValidationCheck from "../src/classes/ValidationCheck";
import RacingController from "../src/controllers/RacingController";
import RacingModel from "../src/model/RacingModel";
import RacingView from "../src/view/RacingView";

describe("자동차 경주 게임 테스트입니다.", () => {
  const validation = new ValidationCheck();
  const racingModel = new RacingModel();
  const racingController = new RacingController();
  const racingView = new RacingView();

  describe("사용자가 잘못된 값을 입력 시 경고와 함께 게임이 종료됩니다.", () => {
    test.each([
      [["car"], "2개 이상의 자동차를 입력해주세요."],
      [[""], "2개 이상의 자동차를 입력해주세요."],
    ])(
      "경기 진행을 위해 자동차의 이름을 최소 2개 이상 작성해야 합니다.",
      (carName, expected) => {
        expect(() => validation.validateCarCount(carName)).toThrow(expected);
      }
    );

    test("자동차 이름은 5자 이하로 작성해야 합니다.", () => {
      expect(() => validation.validateNameLength(["carcars"])).toThrow(
        "이름의 길이는 5자를 넘길 수 없습니다."
      );
    });

    test.each([
      [["car1", "", "car2"], "빈 값은 입력할 수 없습니다."],
      [["car1", "car 2", "car2"], "빈 값은 입력할 수 없습니다."],
      [["car1", " ", "car2"], "빈 값은 입력할 수 없습니다."],
      [["car1", " car", "car2"], "빈 값은 입력할 수 없습니다."],
    ])("자동차 이름은 비어있을 수 없습니다.", (carName, expected) => {
      expect(() => validation.validateEmptyName(carName)).toThrow(expected);
    });

    test.each([
      [["car1", "car1", "car2"], "중복되는 이름은 입력할 수 없습니다."],
      [["car1", "안녕", "car2", "안녕"], "중복되는 이름은 입력할 수 없습니다."],
      [
        ["car1", "안녕", "car2", "안녕", "안녕11"],
        "중복되는 이름은 입력할 수 없습니다.",
      ],
    ])("자동차 이름은 중복될 수 없습니다.", (carName, expected) => {
      expect(() => validation.validateDuplicateName(carName)).toThrow(expected);
    });
  });

  test("랜덤 값이 4이상이 나와야 전진할 수 있습니다.", () => {});

  test("우승자가 여러 명일 때 콤마로 구분해서 출력합니다.", () => {
    const carList = [
      { name: "car1", position: 3 },
      { name: "car2", position: 4 },
      { name: "car3", position: 4 },
    ];

    const jestSpyOn = jest.spyOn(console, "log");

    racingModel.carList = carList;
    racingView.racingModel = racingModel;
    racingView.showRacingGameWinners();

    expect(jestSpyOn).toHaveBeenCalledWith("우승자는 car2,car3입니다");

    jestSpyOn.mockRestore();
  });

  test("각 차들의 position이 0인 경우 우승자는 없습니다.", () => {
    const carList = [
      { name: "car1", position: 0 },
      { name: "car2", position: 0 },
      { name: "car3", position: 0 },
    ];

    const jestSpyOn = jest.spyOn(console, "log");

    racingModel.carList = carList;
    racingView.racingModel = racingModel;
    racingView.showRacingGameWinners();

    expect(jestSpyOn).toHaveBeenCalledWith("우승자는 없습니다.");

    jestSpyOn.mockRestore();
  });
});
