import { Game } from "../Models/Game";
import { PromptView } from "../View/PromptView";

export const GameController = (function () {
  function setEventHandler() {
    const eventHandler = (userInput) => playGame(userInput);
    PromptView.addEventHandlerToPrompt(eventHandler);
  }

  function handleResult(result) {
    PromptView.logGameResult(result);
  }

  function handleError(error) {
    PromptView.logErrorMessage(error.message);
  }

  function playGame(userInput) {
    try {
      Game.setGame(userInput);
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
