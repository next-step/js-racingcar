const racingProcessInfo = {
  status: [],
  tryEndNumber: 0,
  initialize() {
    this.status = [];
    this.tryEndNumber = 0;
  },
  setRaceReadyStatus(carNamesArray) {
    this.status = carNamesArray.map((name) => ({ name, position: 0 }));
  },
  setTryEndNumber(tryEndNumber) {
    this.tryEndNumber = tryEndNumber;
  },
};

export default racingProcessInfo;
