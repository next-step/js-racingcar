import Component from '../lib/component.js';
import store from '../store/index.js';
import el from '../utils/dom.js';
import { $ } from '../utils/utils.js';
import { ACTIONS } from '../constants.js';

export default class WinnerBoard extends Component {
  constructor() {
    super({ store });
  }

  setDom() {
    this.$retryButton = this.$element.querySelector('.btn-cyan');
  }

  setEvent() {
    this.$retryButton.addEventListener('click', () => {
      store.dispatch(ACTIONS.INIT_STATE, store);
    });
  }

  render() {
    this.$element = el(`
        <section class="d-flex justify-center mt-5 winner-board" style="display: none" data-testid="winnerBoard">
            <div>
                <h2>🏆 최종 우승자: ${store.state.winners.join(', ')} 🏆</h2>
                <div class="d-flex justify-center">
                    <button type="button" class="btn btn-cyan">다시 시작하기</button>
                </div>
            </div>
        </section>
    `);

    this.setDom();
    this.setEvent();

    $('.winner-board').replaceWith(this.$element);
  }
}
