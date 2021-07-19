import AttemptNumberInput from './AttemptNumberInput.js';
import Component from './Component.js';
import NameInput from './NameInput.js';
import { 
  isValidName, 
  isValidNum } from './validation.js'; 
import { 
  INVALID_NAME_LENGTH_ERROR,
  ATTEMPT_NUM_UNDER_MIN_ERROR} from './message.js';

export default class App extends Component {
  
  setup() {
    this.state = {}
  }

  mounted() {
    new NameInput('#input-container', {
      inputNames: this.inputNames.bind(this)
    });
  
  }

  template() {
    return `
    <section id="input-container" class="d-flex justify-center mt-5"></section>
    <section class="d-flex justify-center mt-5"></section>
    <section class="d-flex justify-center mt-5"></section>
    `
  }

  inputNames(carNames) {
    const inputCarNames = carNames
                          .split(',')
                          .map(name => name.trim());

    if (!isValidName(inputCarNames)) {
      alert(INVALID_NAME_LENGTH_ERROR);
      return false;  
    }

    this.state = inputCarNames
                  .reduce((obj, name) => ({...obj, [name]: ''}), {})
    new AttemptNumberInput('#input-container form', {
      inputCount: this.inputCount.bind(this),
    });
    return true;
  }

  inputCount(countAttempt) {
    
    if (!isValidNum(countAttempt)) {
      alert(ATTEMPT_NUM_UNDER_MIN_ERROR)
      return false;
    }
    return true;
  }

}