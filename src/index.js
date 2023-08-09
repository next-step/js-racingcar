import GameSimulator from './GameSimulator/index.js';
import { checkCanMoveForward } from './GameSimulator/utils.js';
import GameViewer from './GameViewer/index.js';
import { createMessageViewer } from './utils/createMessageViewer.js';

const messageViewer = createMessageViewer(console.log);
const gameViewer = new GameViewer(messageViewer);
const simulator = new GameSimulator(gameViewer, checkCanMoveForward);

simulator.startGame();
