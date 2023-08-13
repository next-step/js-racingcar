import { Game } from "../Models/Game";
import { PromptView } from "../View/PromptView";
import { readLineInterface } from "../utils";

export const GameController = (function () {
  function addEventHandlerToPrompt() {
    PromptView.getInputsThen(playGame);
  }

  function handleResult(result) {
    PromptView.logGameResult(result);
  }

  function handleError(error) {
    PromptView.logErrorMessage(error.message);
  }

  function playGame(carNames, totalRounds) {
    try {
      Game.setGame(carNames, totalRounds);
      Game.playGame();
      handleResult(Game.getGameResult());
      terminateGame();
    } catch (error) {
      handleError(error);
      setEventHandler();
    }
  }

  function terminateGame() {
    readLineInterface.close();
  }

  return {
    addEventHandlerToPrompt,
  };
})();
