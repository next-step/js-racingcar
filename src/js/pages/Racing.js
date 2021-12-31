import Component from "../lib/Component.js";
import {getRandomIntInclusive} from "../components/utils.js";

export default class Racing extends Component {
  setup() {
    this.state = {
      isRacing: false
    }
    this.CarElement = this.CarElement.bind(this);
  }

  CarElement(car) {
    const {isRacing} = this.state;
    const {name, forward} = car;
    return `
      <div class="mr-2">
        <div class="car-player">${name}</div>
        ${forward > 0 ? new Array(forward).fill('').map(() => '<div class="forward-icon mt-2">⬇️️</div>').join('') : ''}
        ${isRacing ? `<div class="d-flex justify-center mt-3">
          <div class="relative spinner-container">
            <span class="material spinner"></span>
          </div>
        </div>`: ''}
      </div>
    `
  }

  template() {
    const {cars} = this.props;
    return this.props.step >= 2 && (Array.isArray(cars) && cars.length > 0) ? (`
        <section class="d-flex justify-center mt-5">
          <div id="carPlayers" class="mt-4 d-flex">
            ${cars.map(car => this.CarElement(car)).join('')}
          </div>
        </section>
    `) : ('');
  }

  race(car, i) {
    const randomInt = getRandomIntInclusive(0, 9);
    car.records[i] = randomInt;
    car.forward += randomInt >= 4 ? 1 : 0;
    return car;
  }

  record(key, obj) {
    localStorage.setItem(key, JSON.stringify(obj));
  }

  mounted() {
    const {step, tryAmount, changeStep, cars} = this.props;
    const {isRacing} = this.state;
    let tryCount = 0;

    if(step === 2 && !isRacing) {
      this.setState({isRacing: true, cars});
      const it = setInterval(() => {
        cars.forEach(car => this.race(car, tryCount));
        this.setState({cars});
        tryCount++;

        // 입력값 만큼만 반복 후 clear
        if(tryCount >= Number.parseInt(tryAmount)) {
          clearInterval(it);
          const maxForward = Math.max(...cars.map(car => car.forward));
          changeStep({
            step: 3,
            cars: cars,
            winners: cars.filter(car => car.forward === maxForward).map(car => car.name)
          });
          this.record('cars', cars);
        }
      }, 1000);
    }
  }
}