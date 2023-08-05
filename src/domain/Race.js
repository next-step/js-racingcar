const Race = {
  totalCount: 0,    // 총 레이싱 횟수

  // 총 레이싱 횟수 설정한다
  setCount(newCount) {
    this.totalCount = newCount;
  }
};
module.exports = Race;