class Car {
  name;
  position = 0;

  constructor(name) {
    if(name.length > 5) {
      throw new Error('이름은 5자를 초과할 수 없습니다.');
    }
    this.name = name;
  }

  init() {
    this.name = '';
    this.position = 0;
  }

  move() {
    this.position += 1;
  }

  conditionsMove(number) {
    if(number > 3) {
      this.move();
    }
  }

  get name() {
    return this.name;
  }

  get position() {
    return this.position;
  }
}

export default Car;