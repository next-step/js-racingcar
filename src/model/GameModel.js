import { CONDITIONS, ERROR_MESSAGES } from "../constants/constants.js";
import { getIndexesOfMaxValue } from "../utils/utils.js";
import CarModel from "./CarModel.js";

function validateParticipants(cars) {
  if (!Array.isArray(cars) || !cars.every(car => car instanceof CarModel)) {
    throw new Error(ERROR_MESSAGES.INVALID_PARTICIPANT_TYPE);
  }

  if (cars.length < CONDITIONS.min_game_participants_number) {
    throw new Error(ERROR_MESSAGES.INVALID_PARTICIPANT_LENGTH);
  }

  if (new Set(cars.map(car => car.name)).size !== cars.length) {
    throw new Error(ERROR_MESSAGES.DUPLICATED_PARTICIPANTS_NAME);
  }
}
export default class GameModel {
  #round = 0;

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

  get winners() {
    const maxMoveIndexes = getIndexesOfMaxValue(
      this.participants.map(car => car.movement),
    );

    return maxMoveIndexes.map(v => this.participants[v]);
  }
}
