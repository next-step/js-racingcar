import { freezeObject, validateValueType } from "../../common.js";

export class GlobalStore {
  carNames = [];
  iterationCount = 0;

  static validateProps({ carNames, iterationCount }) {
    return (
      validateValueType(carNames, 'array')
      && validateValueType(iterationCount, 'number')
    );
  }

  constructor({
    carNames,
    iterationCount,
  }) {
    this.carNames = carNames;
    this.iterationCount = iterationCount;

    freezeObject(this);
  }
}
