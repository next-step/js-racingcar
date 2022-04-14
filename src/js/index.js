import { $ } from '../utils/dom.js';
import { createStore } from './state/index.js';
import SELECTOR from '../const/selector.js';

import CarNameForm from './views/CarNameForm.js';
import Cars from './views/Cars.js';
import PlayResult from './views/PlayResult.js';
import PlayTimesForm from './views/PlayTimesForm.js';

const App = () => {
  const store = createStore({
    carNames: [],
    times: 0,
    init: true,
    movements: [],
  });

  CarNameForm($(SELECTOR.CAR_NAME_FORM), store);
  PlayTimesForm($(SELECTOR.PLAY_TIMES_FORM), store);
  Cars($(SELECTOR.CAR_LIST), store);
  PlayResult($(SELECTOR.PLAY_RESULT), store);
};

App();
