import Component from './core/Component';
import './components/CarNameForm';
import './components/TryAmountForm';
import './components/GameResult';
import './components/GameProgress';
import { $ } from './utils/querySelector';

interface AppState {
  carNames: string[];
  tryAmount: number;
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
    tryAmount: 0,
  };

  connectedCallback() {
    super.connectedCallback();

    this.$nameForm?.setProps({
      setCarNames: (carNames: string[]) => this.setState.call(this, { carNames }),
    });

    this.$tryAmountForm?.setProps({
      setTryAmount: (tryAmount: number) => this.setState.call(this, { tryAmount }),
    });
  }

  deriveChildren() {
    this.$nameForm = $('my-name-form', this) as Component;
    this.$tryAmountForm = $('my-try-amount-form', this) as Component;
    this.$gameProcess = $('my-game-process', this) as Component;
    this.$gameResult = $('my-game-result', this) as Component;
  }

  onUpdate() {
    console.log(this.state);
  }
}

customElements.define('my-app', App);
