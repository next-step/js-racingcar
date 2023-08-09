import GameInput from './GameInput/index.js';
import GameSimulator from './GameSimulator/index.js';
import { checkCanMoveForward } from './GameSimulator/utils.js';
import GameViewer from './GameViewer/index.js';
import { createMessageViewer } from './utils/createMessageViewer.js';
import { getUserInputByQuestion } from './utils/getUserInputByQuestion.js';

const messageViewer = createMessageViewer(console.log);
const gameViewer = new GameViewer(messageViewer);
const gameInput = new GameInput(getUserInputByQuestion);
const simulator = new GameSimulator(gameViewer, gameInput, checkCanMoveForward);

simulator.startGame();
