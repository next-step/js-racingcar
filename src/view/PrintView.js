export const updateView = {
  printMessage(message) {
    console.log(message);
  },
  printErrorMessage(message) {
    console.log(message);
  },
  printGameStatus(gameStatus) {
    gameStatus.forEach(status => {
      console.log(status);
    });
  },
  printWinners(winnerList) {
    console.log(winnerList);
  },
};
