const racingData = {
  status: [],
  goalPosition: 0,
  initialize() {
    this.status = [];
    this.goalPosition = 0;
  },
  set raceReadyStatus(carNamesArray) {
    this.status = carNamesArray.map((name) => ({ name, position: 0 }));
  },
  set setGoalPosition(tryNumber) {
    this.goalPosition = tryNumber;
  },
};

export default racingData;
