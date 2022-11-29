import { printWinner } from '../ui/printWinner.js';
import showCars from '../ui/showCars.js';
import displayRacingProcess from '../ui/displayRacingProcess.js';
import getWinnerNames from './getWinnerNames.js';

export default function startGame(counts) {
  showCars();
  displayRacingProcess(counts);

  const winnerNames = getWinnerNames();
  printWinner(winnerNames);
}