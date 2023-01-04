import { freezeObject, validateValueType } from "./common";

export class GlobalStore {
  carNames = [];
  iterationCount = 0;

  constructor({
    carNames,
    iterationCount,
  }) {
    this.carNames = validateValueType(carNames, 'array', { undefinedAble: true });
    this.iterationCount = validateValueType(iterationCount, 'number', { undefinedAble: true });

    freezeObject(this);
  }
}
