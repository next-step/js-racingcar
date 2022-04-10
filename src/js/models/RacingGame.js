import RacingInitialView from "../views/RacingInitialView.js";
import CarView from "../views/CarView.js";
import { MOVE_INTERVAL, MIN_NUMBER_FOR_MOVING } from "../constant/index.js";
import { updateInterval } from "../utils/index.js";

const RacingGame = {
  cars: null,

  start(carsInfo) {
    this.cars = this.judgeMovement(carsInfo);

    RacingInitialView.render({ carsInfo: this.cars });

    this.cars.forEach(car => {
      const { name, movement } = car;
      const carView = new CarView({ name: name });

      this.showGameStatus({ target: carView, times: movement });
    });
  },

  showGameStatus({ target, times }) {
    updateInterval({
      fn: target.renderArrow.bind(target),
      interval: MOVE_INTERVAL,
      times: times,
    });
  },

  judgeMovement(cars) {
    return cars.map(({ name, movements }) => {
      const judgedMovement = movements.filter(
        movement => movement >= MIN_NUMBER_FOR_MOVING
      ).length;
      return Object.freeze({ name, movement: judgedMovement });
    });
  },
};

export default RacingGame;
