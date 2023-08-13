import { readLineInterface } from "../utils";

export const PromptView = (function () {
  const GUIDE_MESSAGES = Object.freeze({
    INITIATE:
      "경주할 자동차 이름을 입력하세요(이름은 쉼표(,) 기준으로 구분).\n",
    RESULT: "실행 결과",
  });

  function addEventHandlerToPrompt(cbFunc) {
    readLineInterface.question(GUIDE_MESSAGES.INITIATE, (input) => {
      cbFunc(input);
      readLineInterface.close();
    });
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
