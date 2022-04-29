import RacingGameArena from '../Component/Game/RacingGame.js';
import Track from '../Component/Game/Track.js';

import { selector } from '../../util/consts.js';
import { Component, render } from '../Component/Component.js';

const renderRacingArena = (cars) => {
  render(selector('#app'), Component.create(RacingGameArena()));

  render(
    selector('.racing-arena'),
    cars
      .split(',')
      .map((car) => Component.create(Track(car, 'wait')))
      .reduce((pre, cur) => pre + cur)
  );
};

export default renderRacingArena;
