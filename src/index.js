import { startRaceGame } from './domain/race/index';
import { printWinners, printRace } from './view/viewer';

const { history, winners } = await startRaceGame();
printRace(history);
printWinners(winners);
