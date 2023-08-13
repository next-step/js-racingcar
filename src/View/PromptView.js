import { readLineInterface } from "../utils";

export const PromptView = (function () {
  const GUIDE_MESSAGES = Object.freeze({
    CAR_NAMES_INPUT:
      "경주할 자동차 이름을 입력하세요(이름은 쉼표(,) 기준으로 구분).\n",
    TOTAL_ROUNDS_INPUT: "시도할 회수는 몇회인가요?\n",
    RESULT: "실행 결과",
  });

  function addEventHandlerToPrompt(cbFunc) {
    readLineInterface.question(
      GUIDE_MESSAGES.CAR_NAMES_INPUT,
      (carNamesInput) => {
        readLineInterface.question(
          GUIDE_MESSAGES.TOTAL_ROUNDS_INPUT,
          (roundsInput) => {
            cbFunc(carNamesInput, roundsInput);
            readLineInterface.close();
          }
        );
      }
    );
  }

  const log = console.log;

  function logDivider() {
    log("");
  }

  function logResultGuideMessage() {
    logDivider();

    log(GUIDE_MESSAGES.RESULT);
  }

  function logCarRecord(car) {
    log(`${car.name} : ${"-".repeat(car.position)}`);
  }

  function logRoundRecord(cars) {
    cars.forEach((car) => {
      logCarRecord(car);
    });

    logDivider();
  }

  function logWinnerNames(winnerNames) {
    log(winnerNames.join(", ") + "가 최종 우승했습니다.");
  }

  function logGameResult(result) {
    logResultGuideMessage();

    const { roundHistory, winnerNames } = result;

    roundHistory.forEach((round) => {
      logRoundRecord(round);
    });

    logWinnerNames(winnerNames);
  }

  function logErrorMessage(errorMsg) {
    log("[ERROR]", errorMsg);
  }

  return {
    addEventHandlerToPrompt,
    logErrorMessage,
    logGameResult,
  };
})();
