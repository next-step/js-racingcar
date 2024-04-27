import readline from "readline";

import { RacingModel } from "../src/racing";
import { CarErrors } from "../src/car";
jest.mock("readline");

describe("자동차 경주", () => {
  let mockQuestion;
  let mockRl;

  beforeEach(() => {
    mockQuestion = jest.fn();
    mockRl = { question: mockQuestion, close: jest.fn() };
    readline.createInterface.mockReturnValue(mockRl);
  });

  describe("사용자가 자동차 경주에 참여하는 자동차를 입력한다.", () => {
    test("사용자가 잘못된 길이의 입력 값을 입력하면 에러가 발생한다.", () => {
      // Arrange
      const racing = new RacingModel.Racing();
      mockQuestion.mockImplementation((query, callback) => {
        callback("Tesla, BMW, Porsche");
      });

      // Act & Assert
      expect(() => racing.setup()).rejects.toThrowError(
        CarErrors.CarNameTooLongError
      );
    });

    test("사용자가 입력 값을 입력하지 않으면 에러가 발생한다.", () => {
      // Arrange
      const racing = new RacingModel.Racing();
      mockQuestion.mockImplementation((query, callback) => {
        callback("");
      });

      // Act & Assert
      expect(() => racing.setup()).rejects.toThrowError(
        CarErrors.CarNameRequiredError
      );
    });

    test("사용자는 자동차 이름을 쉼표(,)로 구분하여 입력한다.", async () => {
      // Arrange
      const racing = new RacingModel.Racing();
      mockQuestion.mockImplementation((query, callback) => {
        callback("Tesla, BMW, Audi");
      });

      // Act
      await racing.setup();

      // Assert
      expect(racing.carList.length).toBe(3);
    });
  });

  describe("자동차 경주 게임을 시작한다.", () => {
    test("자동차 경주는 5회로 고정하여 진행한다.", () => {
      // Arrange
      const racing = new RacingModel.Racing();

      // Act
      racing.start();

      // Assert
      expect(racing.round).toBe(5);
    });
  });

  describe("자동차 경주를 종료한다.", () => {
    test("우승자는 한명 이상이다.", async () => {
      // Arrange
      const racing = new RacingModel.Racing();
      jest.spyOn(Math, "random").mockReturnValue(0.4);
      mockQuestion.mockImplementation((query, callback) => {
        callback("Tesla, BMW, Audi");
      });

      // Act
      await racing.setup();
      racing.start();
      racing.end();

      // Assert
      expect(racing.winnerList.length).toBeGreaterThanOrEqual(1);
    });
    test("경주를 완료한 후 우승자를 출력한다.", async () => {
      // Arrange
      const racing = new RacingModel.Racing();
      jest.spyOn(Math, "random").mockReturnValue(0.4);
      mockQuestion.mockImplementation((query, callback) => {
        callback("Tesla");
      });

      // Act
      await racing.setup();
      racing.start();
      racing.end();

      // Assert
      const winner = "Tesla가 최종 우승했습니다.";
      expect(racing.display()).toBe(winner);
    });
    test("우승자가 여려명일 경우 쉼표(,)로 구분하여 출력한다.", async () => {
      // Arrange
      const racing = new RacingModel.Racing();
      jest.spyOn(Math, "random").mockReturnValue(0.4);
      mockQuestion.mockImplementation((query, callback) => {
        callback("Tesla, BMW, Audi");
      });

      // Act
      await racing.setup();
      racing.start();
      racing.end();

      // Assert
      const winnerList = "Tesla, BMW, Audi가 최종 우승했습니다.";
      expect(racing.display()).toBe(winnerList);
    });
  });
});
