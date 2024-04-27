class RacingIO {
  racingCarInput(input) {
    return input.replace(/\s/g, '').split(',');
  }
}

export default RacingIO;
