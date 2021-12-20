import Component from './core/Component';
import './components/NameForm';
import './components/TryAmountForm';
import './components/GameResult';
import './components/GameProgress';
import { $ } from './utils/querySelector';

interface AppState {
  carNames: string[];
}

class App extends Component {
  template = /* html */ `
    <section class="d-flex justify-center mt-5">
      <div>
        <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
        <my-name-form></my-name-form>
        <my-try-amount-form></my-try-amount-form>
      </div>
    </section>

    <section class="d-flex justify-center mt-5">
      <my-game-progress></my-game-progress>
    </section>

    <section class="d-flex justify-center mt-5">
      <my-game-result></my-game-result>
    </section>
  `;

  $nameForm?: Component;
  $tryAmountForm?: Component;
  $gameProcess?: Component;
  $gameResult?: Component;

  state: AppState = {
    carNames: [],
  };

  connectedCallback() {
    super.connectedCallback();

    this.$nameForm!.setProps({
      setCarNames: (carNames: string[]) => this.setState.call(this, { carNames }),
    });
  }

  setElements() {
    this.$nameForm = $('my-name-form') as Component;
    this.$tryAmountForm = $('my-try-amount-form') as Component;
    this.$gameProcess = $('my-game-process') as Component;
    this.$gameResult = $('my-game-result') as Component;
  }

  onUpdate() {
    console.log(this.state.carNames);
  }
}

customElements.define('my-app', App);
