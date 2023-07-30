import GameController from "./GameController";
import UserInterface from "./UserInterface";

// 사용자 입력 대기
const userInterface = new UserInterface();

userInterface.readLineWith(
  "경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n",
  (input) => {
    try {
      const gameController = new GameController(input);
      gameController.play();
    } catch (e) {
      // 프로그램 종료

      return;
    }
  }
);
