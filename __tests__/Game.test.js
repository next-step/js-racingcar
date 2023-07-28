import Game from "../src/Game";

// [Phase 1]
describe("[feature4] 총 5라운드를 반복하고, 우승 자동차 정보를 반환한다.", () => {
  const NAME = "erica";
  const game = new Game([NAME]);

  it("다섯 라운드가 진행된다.", () => {
    const playRoundSpy = jest.spyOn(game, "playRound");

    game.playGame();

    expect(playRoundSpy).toHaveBeenCalledTimes(5);
  });

  it("배열 형태로 우승자 정보를 반환한다.", () => {
    expect(game.getWinners()).toBeInstanceOf(Array);
  });
});
