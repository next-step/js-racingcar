/* eslint-disable class-methods-use-this */
class Output {
  printResultText() {
    return '실행 결과';
  }

  printWinner(winners) {
    return winners.join(', ');
  }

  printCurrentCarTrajectory(car) {
    return `${car.name} : ${'-'.repeat(car.location)}`;
  }

  trajectory(raceResult) {
    raceResult.forEach(({ trajectory }) => {
      trajectory.forEach((car) => {
        console.log(this.printCurrentCarTrajectory(car));
      });
    });
  }
}

export default Output;
