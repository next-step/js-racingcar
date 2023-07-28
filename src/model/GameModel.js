export class GameModel {
  #round = 0;
  #participants = [];

  get participants() {
    return this.#participants;
  }

  set participants(cars) {
    this.#participants = cars;
  }

  get round() {
    return this.#round;
  }

  increaseRound() {
    this.#round++;
  }
}
