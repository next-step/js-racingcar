import Component from './Core/Component.js';
import MakeCar from './Components/MakeCar.js';
import { 
  isValidName, 
  isValidNum } from './Utils/validation.js'; 
import { 
  INVALID_NAME_LENGTH_ERROR,
  ATTEMPT_NUM_UNDER_MIN_ERROR} from './Constants/message.js';
import Car from './Car.js';

export default class App extends Component {
  
  setup() {
    this.state = {
      carLists: [],
      attemptNum: 0,
      currentCount: 0,
    }
  }

  mounted() {
    new MakeCar('#input-container', {
      inputNames: this.inputNames.bind(this),
      inputCount: this.inputCount.bind(this),
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

    const carInstances = inputCarNames
                  .map(name => new Car(name))

    this.state.carLists = carInstances;

    return true;
  }

  inputCount(countAttempt) {

    if (!isValidNum(countAttempt)) {
      alert(ATTEMPT_NUM_UNDER_MIN_ERROR);
      return false;
    }
    this.state.attemptNum  = countAttempt
    
    return true;
  }

  
}