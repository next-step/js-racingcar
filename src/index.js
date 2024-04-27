import { ERROR_CODE, Game } from "./Game";

async function playGame() {
  // Game 클래스를 만들기
  const game = new Game();
  // 자동차 이름을 입력받는다.
  const carNamesString = await game.readLineAsync(
    "자동차 이름을 입력하세요. > "
  );

  // 입력받은 자동차 이름을 배열로 만든다.
  let carNames = game.getCarsByCarsString(carNamesString);

  // 자동차 이름을 잘못입력한 경우 게임 종료
  if (ERROR_CODE.NO_VALUE) {
    console.log(`자동차 이름이 입력되지 않았습니다.`);
    return false;
  }
  if (ERROR_CODE.INVALID_CAR_NAME) {
    console.log(`자동차 이름은 5글자를 넘을 수 없습니다.`);
    return false;
  }

  console.log(`자동차 이름은 ${carNames}입니다.`);
}

let endFlag = true;
let playTime = 1;

const playingGame = playGame();
if (!playingGame) {
  endFlag = false;
  console.log("게임이 비정상적으로 종료 됐습니다.");
}
