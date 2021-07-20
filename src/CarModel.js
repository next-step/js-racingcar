
export default class CarModel {
    constructor() {
      this.cars = [{ carName: "", moved: [0] }];
      this.tryTimes = 0;
    }
    getCars = () => {
      return this.cars;
    };
    setCars = (newCars) => {
      this.cars = [...newCars.split(",")].map((car) => {
        return { carName: car, moved: [0] };
      });
    };
    updateCars = (newCars) => {
      this.cars = [...newCars];
    };
    racingCars = () => {
      const newRacingCars = [...this.cars].map((car) => {
        const { carName, moved } = car;
        const nextMove = Math.floor(Math.random() * 10);
        const filterMoved = moved.filter((move) => move > 3);
        if (nextMove > 3) {
          return {
            carName: carName,
            moved: [...filterMoved, nextMove, 0],
          };
        }
        return {
          carName: carName,
          moved: [...filterMoved, nextMove],
        };
      });
      this.updateCars(newRacingCars);
      return newRacingCars;
    };
    stoppedCars = () => {
      const stoppedCars = [...this.cars].map((car) => {
        const { carName, moved } = car;
        const length = moved.length;
        if (moved[length - 1] <= 3) {
          moved.pop();
          return { carName: carName, moved: [...moved] };
        }
        return car;
      });
      this.updateCars(stoppedCars);
      return stoppedCars;
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
        while (
          wins.length &&
          wins[wins.length - 1].moved.length < car.moved.length
        ) {
          wins.pop();
        }
        wins.push(car);
        if (
          wins.length !== 1 &&
          wins[wins.length - 2].moved.length > wins[wins.length - 1].moved.length
        ) {
          wins.pop();
        }
      });
      return wins;
    };
    reset = () => {
      this.cars = [{ carName: "", moved: [0] }];
      this.tryTimes = 0;
    };
  }