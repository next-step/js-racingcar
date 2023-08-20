import {
  CONDITIONS,
  ERROR_MESSAGES,
  NAME_SEPARATOR,
} from "../constants/constants.js";
import CarModel from "./CarModel.js";
import {
  getIndexesOfMaxValue,
  getRandomNumberInRange,
} from "../utils/utils.js";

export default class GameModel {
  #currentRound = 1;

  #totalRound;

  #participants = [];

  #records = [];

  constructor(names, totalRound) {
    this.participants = names;
    this.totalRound = totalRound;
  }

  play() {
    for (let i = this.#currentRound; i <= this.#totalRound; i += 1) {
      this.#currentRound = i;
      this.#participants.forEach(car => {
        car.go(getRandomNumberInRange());
      });
      this.#records.push(this.#participants.map(car => car.getInfo()));
    }
  }

  get participants() {
    return this.#participants;
  }

  set participants(names) {
    const participants = names
      .split(NAME_SEPARATOR)
      .map(name => new CarModel(name.trim()));

    GameModel.#validateParticipants(participants);
    this.#participants = participants;
  }

  set totalRound(totalRound) {
    GameModel.#validateTotalRound(totalRound);
    this.#totalRound = totalRound;
  }

  get currentRound() {
    return this.#currentRound;
  }

  get records() {
    return this.#records;
  }

  get winners() {
    const maxMoveIndexes = getIndexesOfMaxValue(
      this.participants.map(car => car.movement),
    );

    return maxMoveIndexes.map(v => this.participants[v]);
  }

  static #validateParticipants(cars) {
    if (!Array.isArray(cars) || !cars.every(car => car instanceof CarModel)) {
      throw new Error(ERROR_MESSAGES.INVALID_PARTICIPANTS_TYPE);
    }

    if (cars.length < CONDITIONS.GAME_MIN_PARTICIPANTS_NUMBER) {
      throw new Error(ERROR_MESSAGES.INVALID_PARTICIPANTS_LENGTH);
    }

    if (new Set(cars.map(car => car.name)).size !== cars.length) {
      throw new Error(ERROR_MESSAGES.DUPLICATED_PARTICIPANTS_NAME);
    }
  }

  static #validateTotalRound(totalRound) {
    if (!totalRound) {
      throw new Error(ERROR_MESSAGES.WHITE_TOTAL_ROUND);
    }
    const numberTotalRound = Number(totalRound);
    if (Number.isNaN(numberTotalRound)) {
      throw new Error(ERROR_MESSAGES.INVALID_TOTAL_ROUND_TYPE);
    }
    if (
      numberTotalRound < CONDITIONS.GAME_MIN_TOTAL_ROUND_NUMBER ||
      CONDITIONS.GAME_MAX_TOTAL_ROUND_NUMBER < numberTotalRound
    ) {
      throw new Error(ERROR_MESSAGES.INVALID_TOTAL_ROUND_SIZE);
    }
  }
}
