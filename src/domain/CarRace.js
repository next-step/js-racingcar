class CarRace {
  constructor(competitors, toalRaceCount) {
    this.remainingRaceCount = toalRaceCount;
    this.competitors = competitors;
  }

  get winners() {
    const maxPosition = this.getMaxPosition();
    const winners = this.competitors.filter(
      (competitor) => competitor.position === maxPosition
    );

    return winners;
  }

  getMaxPosition() {
    const positionResults = this.competitors.map(
      (competitor) => competitor.position
    );
    const maxPosition = Math.max(...positionResults);

    return maxPosition;
  }

  race() {
    while (this.remainingRaceCount > 0) {
      this.competitors.forEach((competitor) => {
        competitor.moveRandom();
      });

      this.remainingRaceCount--;
    }
  }
}

export default CarRace;
