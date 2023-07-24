export default class GameWinners {
  constructor() {
    this.winners = [];
  }

  /**
   * @param {carNameForward[]} gameStatus
   * @returns {*} string[] - winners
   */
  setGameWinners(gameStatus) {
    let maxLength = 0;

    // max 찾기
    gameStatus.forEach(car =>
      car.forward.length >= maxLength
        ? (maxLength = car.forward.length)
        : maxLength
    );

    // 중복 winners 처리하기
    gameStatus.forEach(car => {
      if (car.forward.length === maxLength) this.winners.push(car.carName);
    });

    return this.winners;
  }
}
