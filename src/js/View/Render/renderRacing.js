import Go from "../Component/Game/Go.js";
import { selectorAll } from "../../util/consts.js";
import { Component, render } from "../index.js";

const renderArrow = (index) => {
  render(selectorAll('.racing-track')[index], Component.create(Go()));
}

const renderDelay = (index, i) => {
  (function (index) {
    setTimeout(renderArrow(index), 1000 * (i + 1));
  })(index)
}

const canMoveOn = (condition, callback) => {
  if (condition) {
    callback()
  }
}

const setUpRacing = (racing, i) => {
  racing.start().forEach((condition, index) => {
    canMoveOn(condition, renderDelay(index, i))
  }
)}

const renderRacingGame = (racing, value) => {
  Array.from({ length: value }).forEach((e, i) => setUpRacing(racing, i));
}











export default renderRacingGame;
