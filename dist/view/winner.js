import el from '../util/dom.js';
import View from './constructor.js';
import Actions from '../store/action.js';
export default class Winner extends View {
    static #template = `
  <section class="d-flex justify-center mt-5">
    <div>
      <h2>🏆 최종 우승자:  🏆</h2>
      <div class="d-flex justify-center">
        <button type="button" class="btn btn-cyan">다시 시작하기</button>
      </div>
    </div>
  </section>
  `;
    $winner;
    $restart;
    constructor() {
        super();
        const $container = el(Winner.#template);
        this.$winner = $container.querySelector('h2');
        this.$restart = $container.querySelector('button');
        this.$restart.addEventListener('click', this.onRestart);
        el(this, [$container]);
    }
    watch = ({ winners }) => {
        return { winners };
    };
    onStoreUpdated({ winners }) {
        if (!winners.length) {
            this.hide();
            return;
        }
        this.$winner.textContent = `🏆 최종 우승자: ${winners.join(', ')} 🏆`;
        this.show();
    }
    onRestart = () => {
        this.dispatch(Actions.reset);
    };
}
//# sourceMappingURL=winner.js.map