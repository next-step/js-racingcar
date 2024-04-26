import Car from "./Car";

const car = new Car();

class Race {

  constructor(competitors) {
    this._competitors = competitors;
    this._playNumber = 0;
  }

  start() {
    if (car.name >= 5) {
      return;
    }
    for (let i=0; i<5; i++) {
      this._playNumber += 1;
    }
  }

  get playNumber() {
    return this._playNumber;
  }

  get winner() {
    const highestPosition = this.getHighest();
    // return this._competitors.find(competitor => competitor.position === highestPosition);
    const winners = this._competitors.filter(competitor => competitor.position === highestPosition);
    return winners.map(winner => winner.name).join(', ');
  }

  getHighest() {
    return Math.max(...this._competitors.map(competitor => competitor.position));
  }
}

export default Race;