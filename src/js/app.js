import RacingController from './racingcar/Controller.js';
import RacingModel from './racingcar/Model.js';
import CarRegisterView from './racingcar/views/CarRegisterView.js';
import RoundRegisterView from './racingcar/views/RoundResisterView.js';
import ResultView from './racingcar/views/ResultView.js';
import FootprintsView from './racingcar/views/FootprintsView.js';

const racingModel = new RacingModel();
// model:contoller=1:1
const racingController = new RacingController(racingModel);
// controller:view= 1:n
const carRegisterView = new CarRegisterView(racingController, 'car-register');
const roundRegisterView = new RoundRegisterView(racingController, 'round-register');
const gameFootPrintsView = new FootprintsView(racingController, 'game-footprints');
const gameResultsView = new ResultView(racingController, 'game-result');
