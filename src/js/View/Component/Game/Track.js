import Go from "./Go.js";
import Wait from "./Wait.js";

const Track = (carName, type) => {
  return `
  <div class="mr-2 racing-track" data-game="track">
    <div class="car-player">${carName}</div>
    ${type === 'go' ? Go() : Wait()}
  </div>
  `
}

export default Track;
