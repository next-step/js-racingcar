import { Game } from "../Models/Game";
import { PromptView } from "../View/PromptView";

export const GameController = (function () {
  function setEventHandler() {
    const eventHandler = (carNames, totalRounds) =>
      playGame(carNames, totalRounds);
    PromptView.addEventHandlerToPrompt(eventHandler);
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
    } catch (error) {
      handleError(error);
    }
  }

  return {
    setEventHandler,
  };
})();
