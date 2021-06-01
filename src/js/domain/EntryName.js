import SETTINGS from '../settings.js';
import { err } from '../utils.js';

const EntryName = (({ rule, msg }) => {
  const privt = new WeakMap();
  return class {
    constructor(name) {
      this.validateLength(name);
      privt.set(this, { name });
    }

    validateLength(name) {
      const { length } = name;
      if (length < rule.minName || length > rule.maxName) err(msg.invalidName);
    }

    static of(name) {
      return new EntryName(name);
    }

    get name() {
      const { name } = privt.get(this);
      return name;
    }
  };
})(SETTINGS);

export default EntryName;
