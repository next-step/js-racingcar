const RacingCarGame = {
  cars: [],
  tryNum: 0,
  carCnt: 0,

  set Cars(cars) {
    this.cars = cars;
  },
  get Cars() {
    return this.cars;
  },
  set TryNum(tryNum) {
    this.tryNum = Number(tryNum);
  },
  get TryNum() {
    return this.tryNum;
  },
  set CarCnt(carCnt) {
    this.carCnt = carCnt;
  },
  get CarCnt() {
    return this.carCnt;
  },
};

export default RacingCarGame;
