import RacingController from './controller/RacingController.js';
import RacingModel from './model/RacingModels.js';
import InputView from './view/InputView.js';
import TrackView from './view/TrackView.js';
import ResultView from './view/ResultView.js';

window.onload = function () {
  const racingModel = new RacingModel();
  const inputView = new InputView();
  const trackView = new TrackView();
  const resultView = new ResultView();

  const controller = new RacingController(racingModel, inputView, trackView, resultView);
};
