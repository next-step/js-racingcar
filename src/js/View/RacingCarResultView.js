import View from './View';
import { ALERT_MASSAGE, GAME_STATE } from '../constants';

export default class RacingCarResultView extends View {
  constructor(target, model) {
    super(target, model);
    this.model.subscribe(this.render.bind(this));
  }
  setEvent() {
    this.addEvent('click', 'button', this.model.reset.bind(this.model))
  }

  componentWillMount() {
    const DELAY = 2000;
    if (this.model.isGameState([GAME_STATE.FINISHED])) {
      setTimeout(() => alert(ALERT_MASSAGE.FINISH), DELAY);
    }
  }

  getTemplate() {
    if (this.model.isGameState([GAME_STATE.FINISHED])) return `
    <div>
    <h2>🏆 최종 우승자: ${this.model.getWinners()} 🏆</h2>
    <div class="d-flex justify-center">
      <button type="button" class="btn btn-cyan">다시 시작하기</button>
    </div>
  </div>
        `;
    return ''
  }
}
