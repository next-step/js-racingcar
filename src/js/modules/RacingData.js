const racingData = {
  status: [],
  goalTryNumber: 0,
  initialize() {
    this.status = [];
    this.goalTryNumber = 0;
  },
  set raceReadyStatus(carNamesArray) {
    this.status = carNamesArray.map((name) => ({ name, position: 0 }));
  },
  set setGoalTryNumber(tryNumber) {
    this.goalTryNumber = tryNumber;
  },
};

export default racingData;
