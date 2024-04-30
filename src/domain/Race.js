class Race {
  _input;
  _current_lab = 0;
  _move = false;
  _random_num;
  _env = true;
  _lab;

  constructor(input, lab, env) {
    if(typeof lab !== 'number' || lab === 0) {
      throw new Error('랩은 숫자이거나 0보다 커야 합니다.');
    }
    this._input = input;
    this._lab = lab;
    this._env = env !== undefined ? env : true;
  }

  start() {
    if(!this._env)
      console.log("\n실행 결과");
      
    this._current_lab = 0;
    const cars = this._input.cars;
    for (let i = 0; i < this._lab; i++) {
      cars.forEach(car => {
        this.randomNum();
        car.conditionsMove(this._random_num);
      });
      const lab_output = this._input.race_output;
      if(!this._env)
        console.log(lab_output);
      this._current_lab += 1;
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

  get current_lab() {
    return this._current_lab;
  }

  get random_num() {
    return this._random_num;
  }
}

export default Race;