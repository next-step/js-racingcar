export default class CarModel {
  constructor() {
    this.cars = [{ name: "", forwards: [0] }];
    this.tryTimes = 0;
  }
  getCars = () => {
    return this.cars;
  };
  setCars = (newCars) => {
    this.cars = [...newCars.split(",")].map((name) => {
      return { name, forwards: [0] };
    });
  };
  updateCars = (newCars) => {
    this.cars = [...newCars];
    return this.cars;
  };
  racingCars = () => {
    const newRacingCars = this.cars.map((car) => {
      const nextForward = Math.floor(Math.random() * 10);
      const getForwards = car.forwards.filter((forward) => forward > 3);
      const forwards = nextForward > 3 ? [...getForwards, nextForward, 0] : [...getForwards, nextForward];
      return { ...car, forwards };
    });
    return this.updateCars(newRacingCars);
  };
  stopRacingCars = () => {
    const stoppedCars = this.cars.map(({ name, forwards }) => {
      return { name, forwards: forwards.filter((forward) => forward > 3) };
    });
    return this.updateCars(stoppedCars);
  };
  getTryTimes = () => {
    return this.tryTimes;
  };
  setTryTimes = (newTryTimes) => {
    this.tryTimes = newTryTimes;
  };
  isTryTimesExpired = () => {
    this.tryTimes -= 1;
    return this.tryTimes === 0 ? true : false;
  };
  getWinners = () => {
    const wins = [];
    this.cars.forEach((car, idx) => {
      if (wins.length === 0) {
        wins.push(car);
        return;
      }
      while (wins.length && wins[wins.length - 1].forwards.length < car.forwards.length) {
        wins.pop();
      }
      wins.push(car);
      if (wins.length !== 1 && wins[wins.length - 2].forwards.length > wins[wins.length - 1].forwards.length) {
        wins.pop();
      }
    });
    return wins;
  };
  reset = () => {
    this.cars = [{ name: "", forwards: [0] }];
    this.tryTimes = 0;
  };
}
