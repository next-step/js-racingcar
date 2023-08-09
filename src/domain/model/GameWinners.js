export default class GameWinners {
  constructor() {
    this.winners = [];
  }

  /**
   * interface CarNameForward {
      carName: string;
      forward: string;
     }
    * @param {CarNameForward[]} - gameStatus
   * @returns {*} string[] - winners
   */
  setGameWinners(gameStatus) {
    const maxLength = Math.max(...gameStatus.map(car => car.forward.length));

    // 중복 winners 처리하기
    gameStatus.forEach(car => {
      if (car.forward.length === maxLength) this.winners.push(car.carName);
    });

    return this.winners;
  }
}
