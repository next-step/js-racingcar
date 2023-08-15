import { startRaceGame, createRaceStatusMessage, createRaceWinnerMessage } from './domain/race/index';
import { printMessage, printMessageList } from './view/viewer';

const { history, winners } = await startRaceGame();
printMessageList(createRaceStatusMessage(history), (item) => item.join('\n'));
printMessage(createRaceWinnerMessage(winners));
