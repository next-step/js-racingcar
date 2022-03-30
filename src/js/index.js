import RacingCarGame from './RacingCarGame.js';

import { $ } from './utils/dom.js';
import { DOM } from './constants.js';

new RacingCarGame($(`#${DOM.RACING_CAR_GAME_APP_ID}`));
