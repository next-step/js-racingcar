import { createView } from "./View";
import { createGame } from "./Models/Game";

export const createGameController = () => {
  const { addEventHandlerToView, closeView, logErrorMessage, logGameResult } =
    createView();

  function initiate() {
    addEventHandlerToView(play);
  }

  function handleResult(result) {
    logGameResult(result);
  }

  function handleError(error) {
    logErrorMessage(error.getMessage());
  }

  function terminate() {
    closeView();
  }

  function play(carNames, totalRounds) {
    const { setGame, playGame, getGameResult } = createGame();
    try {
      setGame(carNames, totalRounds);
      playGame();
      handleResult(getGameResult());
      terminate();
    } catch (error) {
      handleError(error);
      initiate();
    }
  }

  return {
    initiate,
  };
};
