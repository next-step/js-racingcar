class RacingInfoModel {
  constructor() {
    this.entires = [];
    this.moveCount = 0;
  }

  setEntries(entries) {
    this.entires = [];
    entries.forEach((entry) => {
      if (entry.length === 0) {
        throw new Error("자동차의 이름이 유효하지 않습니다");
      }
      this.entires.push(entries);
    });
  }

  setMoveCount(count) {
    this.moveCount = count;
  }
}

export default new RacingInfoModel();
