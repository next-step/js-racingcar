import SETTINGS from '../settings.js';
import { err } from '../utils.js';

const Component = (({ msg }) =>
  class {
    render() {
      err(msg.noOverriding);
    }
  })(SETTINGS);

export default Component;
