import Car from "../views/Car.js";
import { MIN_NUMBER_FOR_MOVING } from "../constant/index.js";

const RacingGame = {
  judgedCarsInfo: null,
  start(carsInfo) {
    this.judgedCarsInfo = this.judgeMovement(carsInfo);
    const car = new Car(carsInfo);

    car.render();
  },
  judgeMovement(carsInfo) {
    return carsInfo.map(({ name, movements }) => {
      const judgedMovements = movements.filter(
        movement => movement >= MIN_NUMBER_FOR_MOVING
      ).length;
      return Object.freeze({ name, movement: judgedMovements });
    });
  },
};

export default RacingGame;
