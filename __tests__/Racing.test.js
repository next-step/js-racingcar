import { RacingModel } from "../src/racing";

describe("자동차 경주", () => {
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
});
