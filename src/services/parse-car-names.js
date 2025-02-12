import { MAX_LENGTH } from "../constants";

export default class ParseCarNames {
  constructor(input) {
    this.names = input;
  }

  parse() {
    const names = this.names.split(",").map((name) => name.trim());

    names.forEach((name) => {
      if (name.length > MAX_LENGTH)
        throw new Error("자동차 이름은 5자 이하만 가능합니다.");
    });

    return names;
  }
}
