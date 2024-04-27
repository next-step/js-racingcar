class RacingIO {
  racingCarInput(input) {
    return input.replace(/\s/g, '').split(',');
  }
  positionToString(position) {
    return '-'.repeat(position);
  }
}

export default RacingIO;
