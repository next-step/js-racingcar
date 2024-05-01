import { Car } from "./Car";
import { ERROR_CODE, Game, PLAY_TIME } from "./Game";

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
  if (carNames === ERROR_CODE.NO_VALUE) {
    console.log(`자동차 이름이 입력되지 않았습니다.`);
    return;
  }
  if (carNames === ERROR_CODE.INVALID_CAR_NAME) {
    console.log(`자동차 이름은 5글자를 넘을 수 없습니다.`);
    return;
  }
  if (carNames === ERROR_CODE.DUPLICATE) {
    console.log(`중복된 자동차 이름이 있습니다.`);
    return;
  }

  console.log(`자동차 이름은 ${carNames}입니다.`);

  const isSetCars = carNames.some((carName) => {
    const result = game.setCar(new Car(carName));
    return !result;
  });

  if (isSetCars) {
    console.log("자동차가 제대로 세팅되지 않았습니다.");
    return;
  }

  for (let i = 0; i < PLAY_TIME + 2; i++) {
    game.play();
  }
}

let endFlag = true;

const playingGame = playGame();
if (!playingGame) {
  endFlag = false;
  console.log("게임이 비정상적으로 종료 됐습니다.");
}
