import RacingController from './racingcar/Controller.js';
import RacingModel from './racingcar/Model.js';
import CarRegisterView from './racingcar/views/CarRegisterView.js';
import RoundRegisterView from './racingcar/views/RoundResisterView.js';
import ResultView from './racingcar/views/ResultView.js';
import FootprintsView from './racingcar/views/FootprintsView.js';

const racingModel = new RacingModel();
// model:contoller=1:1
// controller:view= 1:n
const carRegisterView = new CarRegisterView('car-register');
const roundRegisterView = new RoundRegisterView('round-register');
const gameFootPrintsView = new FootprintsView('game-footprints');
const gameResultsView = new ResultView('game-result');

const views = {
	carRegisterView,
	roundRegisterView,
	gameFootPrintsView,
	gameResultsView,
};
const racingController = new RacingController(racingModel, views);
