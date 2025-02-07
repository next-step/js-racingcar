export default class Car {
  constructor(name) {
    this.name = name;
    this.state = 0;
  }
  go() {
    this.state += 1;
    return;
  }

  async getName() {
    await readLineAsync().then((name) => {});
  }
}
