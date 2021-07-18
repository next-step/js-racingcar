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

{
  /* 
  <div class="mr-2">
    <div class="car-player">EAST</div>
    <div class="forward-icon mt-2">⬇️️</div>
    <div class="forward-icon mt-2">⬇️️</div>
  </div>
  <div class="mr-2">
    <div class="car-player">WEST</div>
    <div class="forward-icon mt-2">⬇️️</div>
  </div>
  <div class="mr-2">
    <div class="car-player">SOUTH</div>
    <div class="d-flex justify-center mt-3">
      <div class="relative spinner-container">
        <span class="material spinner"></span>
      </div>
    </div>
  </div>
  <div class="mr-2">
    <div class="car-player">NORTH</div>
    <div class="d-flex justify-center mt-3">
      <div class="relative spinner-container">
        <span class="material spinner"></span>
      </div>
  </div>
</div> */
}
export default CarPlayArea;
