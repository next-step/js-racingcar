import {
  DEFAULT_SCORE,
  WINNER_ANNOUNCEMENT_MESSAGE,
} from "../../constants/rules";

const generateForwardIcon = score => {
  return DEFAULT_SCORE.repeat(score);
};

export const updateView = {
  printMessage(message) {
    console.log(message);
  },

  printErrorMessage(message) {
    console.log(message);
  },

  printGameRace(gameRaceList) {
    gameRaceList.forEach(car => {
      const carForwardIcon = generateForwardIcon(car.forward);
      console.log(`${car.carName}: ${carForwardIcon}`);
    });
  },

  printWinners(racerWinnerList) {
    console.log(racerWinnerList.join(",") + WINNER_ANNOUNCEMENT_MESSAGE);
  },
};
