export class Car {
  name;
  constructor() {
    this.name = '';
  }

  setName(name) {
    if (name.length > 5) {
      this.name = '';
    } else {
      this.name = name;
    }
  }

  getName() {
    return this.name;
  }
}
