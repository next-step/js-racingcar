class RacingInfoModel {
  constructor() {
    this.entires = [];
  }

  setEntries(entries) {
    this.entires = [...entries];
  }
}

export default new RacingInfoModel();
