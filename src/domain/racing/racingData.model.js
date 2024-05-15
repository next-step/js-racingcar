import {
  INITIAL_RACING_HISTORY,
  INITIAL_WINNER_LIST,
} from "./racing.constant.js";

class RacingData {
  #racingHistory = INITIAL_RACING_HISTORY;
  #winnerList = INITIAL_WINNER_LIST;

  constructor() {
    this.#racingHistory = [];
    this.#winnerList = [];
  }

  #generateRacingHistory(carList) {
    return carList.map((car) => ({
      name: car.name,
      position: car.position,
    }));
  }

  updateRacingHistory(carList) {
    const history = this.#generateRacingHistory(carList);
    this.#racingHistory = [...this.#racingHistory, ...history];
  }

  determineWinnerList(carList) {
    const maxPosition = Math.max(...carList.map((car) => car.position));
    this.#winnerList = carList.filter((car) => car.position === maxPosition);
  }

  get racingHistory() {
    return [...this.#racingHistory];
  }

  get winnerList() {
    return [...this.#winnerList];
  }
}

export default RacingData;
