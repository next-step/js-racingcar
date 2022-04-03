import Go from "../Component/Game/Go.js";
import { selectorAll } from "../../util/consts.js";
import { Component, render } from "../index.js";

const renderArrow = (index) => {
  render(
    selectorAll('.racing-track')[index],
    Component.create(Go())
  );
}

const renderDelay = (index, i) => {
  setTimeout(() => {
    renderArrow(index)
  }, 1000 * (i + 1));
}

const setUpRacing = (racing, i) => {
  racing.start().forEach((condition, index) => {
    if (condition) renderDelay(index, i)
  }
)}

const renderRacingGame = (racing, value) => {
  Array.from({ length: value }).forEach((e, i) => setUpRacing(racing, i));
}

export default renderRacingGame;
