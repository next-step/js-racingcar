export default class CarModel {
  constructor() {
    this.cars = [{ name: "", forwards: [0] }];
    this.tryTimes = 0;
  }

  //CARS
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

  //TRYTIME
  getTryTime = () => {
    return this.tryTime;
  };
  setTryTime = (newTryTime) => {
    this.tryTimes = newTryTime;
  };
  isTryTimeExpired = () => {
    this.tryTimes -= 1;
    return this.tryTimes === 0 ? true : false;
  };

  //WINNER
  getWinners = () => {
    const _cars = [...this.cars];
    _cars.sort((c1, c2) => {
      return c2.forwards.length - c1.forwards.length;
    });
    const wins = _cars.filter((car) => {
      return _cars[0].forwards.length === car.forwards.length;
    });
    return wins;
  };
  reset = () => {
    this.cars = [{ name: "", forwards: [0] }];
    this.tryTimes = 0;
  };
}
