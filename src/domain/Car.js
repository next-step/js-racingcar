export default class Car {
  name;

  constructor(name) {
    if (name.length > 5) {
      throw new Error("자동차 이름은 5자 이하만 가능합니다.");
    }
    this.name = name;
  }
}
