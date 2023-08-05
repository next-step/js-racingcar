const Car = {
  name: '',     // 이름
  position: 0,  // 전진횟수

  // 전진하기
  go() {
    this.position++;
  }
};
module.exports = Car;