import CarRegisterView from './racingcar/CarRegisterView.js';
import RacingController from './racingcar/RacingController.js';
import RacingModel from './racingcar/Model.js';
import RoundRegisterView from './racingcar/RoundResisterView.js';
import Footprints from './racingcar/FootprintsView.js';
import ResultView from './racingcar/ResultView.js';

const racingModel = new RacingModel();
const racingController = new RacingController(racingModel);
const carRegisterView = new CarRegisterView(racingController, 'car-register');
const roundRegisterView = new RoundRegisterView(racingController, 'round-register');
const gameFootPrintsView = new Footprints(racingController, 'game-footprints');
const gameResultsView = new ResultView(racingController, 'game-result');
