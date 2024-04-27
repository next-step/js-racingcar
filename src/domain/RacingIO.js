class RacingIO {
  racingCarInput(input) {
    return input.replace(/\s/g, '').split(',');
  }
  positionToString(position) {
    return '-'.repeat(position);
  }
  printWinners(winners) {
    return winners.toString().replace(/,/g, ', ');
  }
}

export default RacingIO;
