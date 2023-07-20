class WinnerChecker {
  static getWinners(cars) {
    const winners = [];
    const ranking = cars.slice().sort((a, b) => b.distance - a.distance);
    const winningDistance = ranking[0].distance;
    for (let i = 0; i < ranking.length; i += 1) {
      const isWinner = ranking[i].distance === winningDistance;
      if (!isWinner) break;
      winners.push(ranking[i].name);
    }
    return winners;
  }
}

module.exports = WinnerChecker;
