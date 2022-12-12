import { ALERT_MASSAGE, GAME_STATE } from '../constants';
import RacingCar from '../Service/RacingCar';
import Observer from './Observer';
/**
 * @class RaceModel
 * @extends Observer
 * @property {RacingCar[]} #cars
 * @property {number | null} #tryCount
 * @property {'initial'| 'ready' | 'playing' | 'finished'} #gameState
 */
export default class RaceModel extends Observer {
  #cars;
  #tryCount;
  #gameState;
  constructor() {
    super();
    this.#cars = [];
    this.#tryCount = null;
    this.#gameState = GAME_STATE.INITIAL;
  }

  /**
   * 참가하는 차들의 이름을 추가합니다.
   * @param {string[]} cars
   */
  setCarNames(cars) {
    this.#cars = cars.map((car) => new RacingCar(car.trim()));
    this.#gameState = GAME_STATE.READY;
    this.notify();
  }

  /**
   * @param {number} tryCount
   */
  #validateTryCount(tryCount) {
    const minTryCount = 1;
    if (tryCount < minTryCount) {
      throw new Error(ALERT_MASSAGE.INVALID_RACING_COUNT(minTryCount));
    }
  }

  /**
   * @returns {{name, position}[]}
   */
  getCarNamesAndPositions() {
    return this.#cars.map((car) => ({
      name: car.getName(),
      position: car.getPosition(),
    }));
  }

  #getGameState() {
    if (this.#isFinished()) return GAME_STATE.FINISHED;
    return this.#gameState;
  }
  /**
   *
   * @param {gameState[]} targetStates
   * @returns {boolean}
   */
  isGameState(targetStates) {
    return targetStates.includes(this.#getGameState());
  }

  /**
   * 경기가 끝났는지 아닌지를 반환합니다.
   * @returns {boolean}
   */
  #isFinished() {
    return this.#tryCount !== null && this.#tryCount <= 0;
  }

  async #moveCars() {
    while (this.#tryCount--) {
      await Promise.all(this.#cars.map((car) => car.move()));
      this.notify();
    }
    this.#gameState = GAME_STATE.FINISHED;
  }

  reset() {
    this.#cars = [];
    this.#tryCount = null;
    this.#gameState = GAME_STATE.INITIAL;
    this.notify();
  }

  getWinners() {
    const maxPosition = Math.max(...this.#cars.map((car) => car.getPosition()));
    return this.#cars
      .filter((car) => car.getPosition() === maxPosition)
      .map((car) => car.getName())
      .join(', ');
  }

  /**
   * @param {number} tryCount
   */
  play(tryCount) {
    this.#validateTryCount(tryCount);
    this.#tryCount = tryCount;
    this.#gameState = GAME_STATE.PLAYING;
    this.notify();
    this.#moveCars();
  }
}
