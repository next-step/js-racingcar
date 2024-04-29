import InputOutput from "./InputOutput";
import Car from "./Car";

const LAB = 5;
class Race {
  _input;
  current_lab = 0;
  move = false;
  _random_num;

  constructor(input) {
    this._input = input;
  }

  start() {
    console.log("실행 결과");
    this.current_lab = 0;
    const cars = this._input.cars;
    for (let i = 0; i < LAB; i++) {
      cars.forEach(car => {
        this.randomNum();
        car.conditionsMove(this._random_num);
      });
      const lab_output = this._input.race_output;
      console.log(lab_output);
      this.current_lab += 1;
    }
  }

  winner() {
    const winner = this._input.winner;
    console.log(winner);
  }

  randomNum() {
    const number = Math.floor(Math.random() * 10);
    this._random_num = number;
  }

  conditionsMove(number) {
    if(number > 3) {
      this.move = true;
    }
  }

  get current_lab() {
    return this.current_lab;
  }

  get move() {
    return this.move;
  }

  get random_num() {
    return this.random_num;
  }
}

export default Race;