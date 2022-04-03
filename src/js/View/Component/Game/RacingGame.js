import Go from "./Go.js";
import Wait from "./Wait.js";
import Track from "./Track.js"

const RacingGame = (carName, type) => {
  return `
  <section class="d-flex justify-center mt-5">
    <div class="mt-4 d-flex racing-arena" data-game="arena">
      ${Track(carName, type)}
    </div>
  </section>
  `
}

export default RacingGame;
