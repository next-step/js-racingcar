import { initCarNameFormView } from './views/carNameForm.js';
import { initRacingCountFormView } from './views/racingCountForm.js';
import RacingGameModel from './models/RacingGameModel.js';

const racingGameModel = new RacingGameModel();

initCarNameFormView(racingGameModel);
initRacingCountFormView(racingGameModel);
