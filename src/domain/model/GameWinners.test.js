import GameWinners from "./GameWinners";

describe("GameWinners - Setting game winners", () => {
  test("Should return winner when forward is max length", () => {
    // Given
    const gameWinners = new GameWinners();

    const status = [
      { carName: "frank", forward: 0 },
      { carName: "kim", forward: 1 },
      { carName: "happy", forward: 2 },
      { carName: "happy man", forward: 2 },
    ];

    // When
    const winner = gameWinners.setGameWinners(status);

    // Then
    expect(winner).toEqual(["happy", "happy man"]);
  });
});
