import Component from '../core/Component/Component.js';
import { qsAll } from '../util/helper.js';
import CarInputForm from './Car/CarInputForm.js';
import CarPlayArea from './Car/CarPlayArea.js';
import CarWinnerArea from './Car/CarWinnerArea.js';

class CarContainer extends Component {
  constructor($target, $props, store) {
    super($target, $props, store);
  }

  template() {
    return `
        <section class="d-flex justify-center mt-5"></section>
        <section class="d-flex justify-center mt-5"></section>
        <section class="d-flex justify-center mt-5"></section>
        `;
  }

  mounted() {
    const sections = qsAll('.mt-5');

    new CarInputForm(sections[0], null, this.$store);
    new CarPlayArea(sections[1], null, this.$store);
    new CarWinnerArea(sections[2], null, this.$store);
  }
}

export default CarContainer;
