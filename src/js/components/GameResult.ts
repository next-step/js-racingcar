import Component from '../core/Component';
import { $ } from '../utils/querySelector';

class GameResult extends Component {
  template = /*html*/ `
    <div>
      <h2>🏆 최종 우승자: <span id="winner" ></span> 🏆</h2>
      <div class="d-flex justify-center">
        <button type="button" id="game-reset" class="btn btn-cyan">다시 시작하기</button>
      </div>
    </div>
  `;

  $winner?: HTMLSpanElement;
  $gameResetButton?: HTMLButtonElement;

  deriveChildren(): void {
    this.$winner = $('#winner', this) as HTMLSpanElement;
    this.$gameResetButton = $('#game-reset') as HTMLButtonElement;
  }

  onUpdate(): void {
    const { winners = [] } = this.props;

    this.$winner!.innerText = winners.join(', ');
  }

  bindEvents(): void {
    this.$gameResetButton?.addEventListener('click', () => this.props.reset());
  }
}

customElements.define('my-game-result', GameResult);
