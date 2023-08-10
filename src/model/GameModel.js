import { CONDITIONS, ERROR_MESSAGES } from "../constants/constants.js";
import { getIndexesOfMaxValue } from "../utils/utils.js";
import CarModel from "./CarModel.js";

function validateParticipants(cars) {
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

function validateTotalRound(totalRound) {
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

export default class GameModel {
  #round = 0;

  #totalRound;

  #participants = [];

  get participants() {
    return this.#participants;
  }

  set participants(cars) {
    validateParticipants(cars);
    this.#participants = cars;
  }

  get round() {
    return this.#round;
  }

  increaseRound() {
    this.#round += 1;
  }

  get totalRound() {
    return this.#totalRound;
  }

  set totalRound(totalRound) {
    validateTotalRound(totalRound);
    this.#totalRound = totalRound;
  }

  get winners() {
    const maxMoveIndexes = getIndexesOfMaxValue(
      this.participants.map(car => car.movement),
    );

    return maxMoveIndexes.map(v => this.participants[v]);
  }
}
