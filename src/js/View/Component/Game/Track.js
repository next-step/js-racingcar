import Go from "./Go.js";
import Wait from "./Wait.js";

const Track = (carName, type) => {
  return `
  <div class="mr-2 track-container"  >
    <div class="car-player">${carName}</div>
      <div class="racing-track" data-game="track">
      </div>
      ${type === 'go' ? Go() : Wait()}
  </div>
  `
}

export default Track;
