/* eslint-disable class-methods-use-this */
class Output {
  printResultText() {
    return '실행 결과';
  }

  printJoinWinner(winners) {
    return winners.join(', ');
  }

  printCurrentCarTrajectory(car) {
    return `${car.name} : ${'-'.repeat(car.location)}`;
  }

  printTrajectory(raceResult) {
    raceResult.forEach(({ trajectory }) => {
      trajectory.forEach((car) => {
        console.log(this.printCurrentCarTrajectory(car));
      });
    });
  }

  printFinalWinner(winner) {
    return `${this.printJoinWinner(winner)}가 최종 우승했습니다.`;
  }
}

export default Output;
