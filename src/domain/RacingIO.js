class RacingIO {
  writeRacingCar(input) {
    return input.replace(/\s/g, '').split(',');
  }
  readCarPosition(position) {
    return '-'.repeat(position);
  }
  readWinners(winners) {
    return winners.toString().replace(/,/g, ', ');
  }
}

export default RacingIO;
