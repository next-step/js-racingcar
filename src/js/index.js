import RacingModel from './model/RacingModel.js';
import RacingView from './view/RacingView.js';
import RacingController from './controller/RacingController.js';

const racingModel = new RacingModel();
const racingView = new RacingView(racingModel);
new RacingController(racingModel, racingView);
