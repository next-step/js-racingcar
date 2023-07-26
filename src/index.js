import * as readline from "readline";
import RacingCarGame from "./class/RacingCarGame";

const CAR_NAME_INPUT_GUIDE =
  "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n";

const CAR_NAME_SEPARATOR = ",";

const CAR_NAME_MAX_LENGTH = 5;
const CAR_NAME_MIN_LENGTH = 1;

const CAR_RACE_TITLE = "\n실행 결과";

const ERROR_MESSAGES = {
  INVALID_EMPTY_NAME: "자동차 이름은 빈값일 수 없습니다.",
  INVALID_NAME_LENGTH: "자동차 이름은 5자를 넘길 수 없습니다.",
  DUPLICATE_CAR_NAME: "자동차 이름은 중복될 수 없습니다.",
};

const RACING_CAR_ERROR_NAME = "RACING_CAR_ERROR";

const RACING_SCORE_CHAR = "-";

const RACING_ROUNDS = 5;

const WINNER_ANNOUNCEMENT_MESSAGE = "가 최종 우승했습니다.";

class RacingCarGameError extends Error {
  constructor(message) {
    super(message);
    this.name = RACING_CAR_ERROR_NAME;
  }
}

const racingCarGameReadline = readline.createInterface({
  input: process.stdin,
  output: process.stdin,
});

const handleGameStart = () => {
  return new Promise((resolve) => {
    racingCarGameReadline.question(CAR_NAME_INPUT_GUIDE, (answer) => {
      resolve(answer.split(CAR_NAME_SEPARATOR));
    });
  });
};

const handleGameEnd = () => {
  racingCarGameReadline.close();
};

const validateCarNames = (names) => {
  for (const name of names) {
    if (name.trim().length < CAR_NAME_MIN_LENGTH) {
      throw new RacingCarGameError(ERROR_MESSAGES.INVALID_EMPTY_NAME);
    }

    if (name.length > CAR_NAME_MAX_LENGTH) {
      throw new RacingCarGameError(ERROR_MESSAGES.INVALID_NAME_LENGTH);
    }
  }

  const uniqueCarNames = new Set(names.map((name) => name.trim()));

  if (names.length !== uniqueCarNames.size) {
    throw new RacingCarGameError(ERROR_MESSAGES.DUPLICATE_CAR_NAME);
  }
};

const handleError = (error) => {
  if (error instanceof RacingCarGameError) {
    console.log(error.message);
  }
};

const handleMultipleRoundsStart = () => {
  console.log(CAR_RACE_TITLE);
};

const handleSingleRoundEnd = (cars) => {
  cars.forEach((carInfo, carName) => {
    console.log(`${carName} : ${RACING_SCORE_CHAR.repeat(carInfo.distance)}`);
  });
  console.log("");
};

const handleMultipleRoundsEnd = (cars) => {
  const distanceArray = [...cars.values()].map((el) => el.distance);
  const maxDistance = Math.max(...distanceArray);

  const winners = [...cars.keys()].filter(
    (car) => cars.get(car).distance === maxDistance
  );

  console.log(
    `${winners.join(CAR_NAME_SEPARATOR)}${WINNER_ANNOUNCEMENT_MESSAGE}`
  );
};

const checkForAdvance = () => {
  return Math.random() * 9 >= 4;
};

const racingCarGame = new RacingCarGame({
  roundNumbers: RACING_ROUNDS,
  onGameStart: handleGameStart,
  onGameEnd: handleGameEnd,
  validateCarNames,
  onError: handleError,
  onMultipleRoundStart: handleMultipleRoundsStart,
  onSingleRoundEnd: handleSingleRoundEnd,
  onMultipleRoundEnd: handleMultipleRoundsEnd,
  checkForAdvance,
});

racingCarGame.startGame();
