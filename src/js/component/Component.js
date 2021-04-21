import SETTINGS from '../settings.js';
import { err } from '../utils.js';

const Component = (({ msg }) =>
  class {
    static of(app, sel) {
      return new this(app, sel);
    }

    render() {
      err(msg.noOverriding);
    }
  })(SETTINGS);

export default Component;
