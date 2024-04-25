export class Controller {
  carNames;

  constructor() {}

  init(input) {
    this.validate(input);
    this.carNames = input.split(",");
  }

  validate(input) {
    if (typeof input !== "string") {
      throw new Error("잘못된 입력입니다.");
    }

    if (input === "") {
      throw new Error("잘못된 입력입니다.");
    }

    const split = input.split(",");

    if (split.includes("")) {
      throw new Error("잘못된 입력입니다.");
    }

    if (split.length !== new Set(split).size) {
      throw new Error("잘못된 입력입니다.");
    }
  }

  get carNames() {
    return [...this.carNames];
  }
}
