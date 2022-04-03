import { selector } from "../../util/consts.js";
import { render, Component } from "../index.js"

import RacingGameArena from "../Component/Game/RacingGame.js";
import Track from "../Component/Game/Track.js";


const renderRacingArena = (cars) => {
  const container = Component.create(RacingGameArena())
  render(selector('#app'), container)
  
  cars = cars.split(',') 
    .map(car => Component.create(Track(car, 'wait')))
    .reduce((pre, cur) => pre + cur)
  
  
  render(selector('.racing-arena'), cars)
}

export default renderRacingArena;
