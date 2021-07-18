import Component from '../../core/Component/Component.js';
import { qs } from '../../util/helper.js';
import CarPlayer from './CarPlayer.js';

class CarPlayArea extends Component {
  constructor($target, $props, store) {
    super($target, $props, store);
  }

  template() {
    return `
        <div class="mt-4 d-flex">
        </div>
    `;
  }
  mounted() {
    new CarPlayer(qs('.mt-4.d-flex'), this.$props, this.$store);
  }
}

export default CarPlayArea;
