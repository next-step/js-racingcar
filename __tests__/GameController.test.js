import GameController from "../src/Controller/GameController";
// import View from "../src/View/View";

describe("[flow1] GameController는 view와 game을 상태값으로 가진다.", () => {
  let gameController = new GameController("erica, gong");

  it("GameController는 View 인스턴스를 상태값으로 가진다.", () => {
    expect(gameController.view).toBeInstanceOf(View);
    gameController = null;
  });

  it("GameController는 View 인스턴스를 상태값으로 가진다.", () => {});
});
