import Component from '../lib/component.js';
import store from '../store/index.js';
import el from '../utils/dom.js';
import { $ } from '../utils/utils.js';
import { ACTIONS } from '../constants.js';

export default class CarProgressContainer extends Component {
  constructor() {
    super({ store });
  }

  render() {
    this.$element = el(`
      <div class="mt-4 d-flex progress-board" style="display: none">
      </div>
    `);

    $('.progress-board').replaceWith(this.$element);
  }
}
