import Component from './Component.js';
import NameInput from './NameInput.js';

export default class App extends Component {
  
  mounted() {
    new NameInput('#input-container')
  }

  template() {
    return `
    <section id="input-container" class="d-flex justify-center mt-5"></section>
    <section class="d-flex justify-center mt-5"></section>
    <section class="d-flex justify-center mt-5"></section>
    `
  }

}