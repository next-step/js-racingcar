import { CAR_PROGRESS_THRESHOLD } from "../constants/car.js";
import { createStore } from "./@common/store.js";

const initialState = {
  cars: [],
  tryCount: 0,
};

const racingCarGameStore = createStore(initialState);

const racingCarGameStoreAction = {
  initCars(carNames) {
    racingCarGameStore.setState({ cars: carNames.map((name) => ({ name, location: 0 })) });
  },

  progressCar(count) {
    for (let i = 0; i < count; i++) {
      this.progressCarOnce();
    }
  },

  progressCarOnce() {
    const cars = racingCarGameStore.selectState((state) => state.cars.map((car) => ({ ...car })));

    cars.forEach((car) => {
      const isProgressed = Math.floor(Math.random() * 10) >= CAR_PROGRESS_THRESHOLD;

      if (isProgressed) {
        car.location++;
      }
    });

    racingCarGameStore.setState({ cars });
  },
};

export default racingCarGameStore;
export { racingCarGameStoreAction };
