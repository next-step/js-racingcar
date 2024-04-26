class Race {

  playNumber = 0;

  start() {
    for (let i=0; i<5; i++) {
      this.playNumber += 1;
    }
  }

  get playNumber() {
    return this.playNumber;
  }
}

export default Race;