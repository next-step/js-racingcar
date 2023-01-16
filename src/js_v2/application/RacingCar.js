import checkThresholdScore from '../domain/checkThresholdScore.js';
import sortObjectByValue from '../util/sortObjectByValue.js';

export default class RacingCar {
  #cars;

  constructor(cars) {
    this.#cars = cars;
  }

  race() {
    return this.#cars.reduce((acc, cur, idx) => {
      const score = checkThresholdScore();
      cur.move(score);
      return {...acc, [cur.name]: cur.position};
    }, {});
  }

  getRacingResults(racingRecords, carNames) {
    carNames = carNames.split(',');

    const results = racingRecords.reduce((acc,cur)=>{
        carNames.forEach((carName)=>{
            acc[carName] = (acc[carName] || 0) + cur[carName];
        })
        return acc;
    },{})

    return results;
  }

  getWinner(results) {
    const sortedResults = sortObjectByValue(results, 'desc');
    const firstWinner = sortedResults[0][0];
    const winner = [firstWinner];

    sortedResults.forEach((it, idx, arr) => {
      const currentCar = it;
      const nextCar = arr[idx + 1];

      if(!nextCar || currentCar[1] > nextCar[1]) return;

      winner.push(nextCar[0]);
    });

    return winner;
  }
}