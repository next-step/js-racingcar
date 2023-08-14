import startGame from './domain/race/startGame';
import { printWinners, printRace } from './view/viewer';

const { history, winners } = await startGame();
printRace(history);
printWinners(winners);
