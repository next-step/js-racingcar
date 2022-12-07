import { printWinner } from '../ui/printWinner.js';
import showCars from '../ui/showCars.js';
import displayRacingProcess from '../ui/displayRacingProcess.js';
import getWinnerNames from '../model/getWinnerNames.js';

export default async function startGame(counts) {
  showCars();
  await displayRacingProcess(counts);

  const winnerNames = getWinnerNames();
  printWinner(winnerNames);
}
