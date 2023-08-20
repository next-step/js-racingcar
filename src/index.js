import GameInput from './view/GameInput/index.js';
import GameSimulator from './controller/GameSimulator/index.js';
import { checkCanMoveForward } from './controller/GameSimulator/utils.js';
import GameViewer from './view/GameViewer/index.js';
import { createMessageViewer } from './utils/createMessageViewer.js';
import { getUserInputByQuestion } from './utils/getUserInputByQuestion.js';

const messageViewer = createMessageViewer(console.log);
const gameViewer = new GameViewer(messageViewer);
const gameInput = new GameInput(getUserInputByQuestion);
const simulator = new GameSimulator(gameViewer, gameInput);

simulator.startGame(checkCanMoveForward);
