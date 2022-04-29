import Go from '../Component/Game/Go.js';

import { selectorAll } from '../../util/consts.js';
import { Component, render } from '../Component/Component.js';

const renderArrow = (index, time) => {
  setTimeout(() => {
    render(selectorAll('.racing-track')[index], Component.create(Go()));
  }, (time + 1) * 1000);
};

const setUpRacing = (racing) => {
  return racing.start().map((condition) => condition);
};

const racingGameResult = (racing, value) => {
  return Array.from({ length: value }).map((e, i) => setUpRacing(racing, i));
};

const renderRacingGame = (racing, value) => {
  racingGameResult(racing, value).forEach((stepResult, time) => {
    stepResult.forEach((car, index) => car && renderArrow(index, time));
  });
};

export default renderRacingGame;
