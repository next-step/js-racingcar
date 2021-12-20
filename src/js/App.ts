import Component from './core/Component';
import './components/NameForm';
import './components/TryAmountForm';
import './components/GameResult';
import './components/GameProgress';

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
}

customElements.define('my-app', App);
