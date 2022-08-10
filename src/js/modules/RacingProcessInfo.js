const racingProcessInfo = {
  status: [],
  tryNumber: 0,
  initialize() {
    this.status = [];
    this.tryNumber = 0;
  },
  setRaceReadyStatus(carNamesArray) {
    this.status = carNamesArray.map((name) => ({ name, position: 0 }));
  },
  setTryNumber(tryNumber) {
    this.tryNumber = tryNumber;
  },
};

export default racingProcessInfo;
