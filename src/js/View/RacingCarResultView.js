import View from './View';

export default class RacingCarResultView extends View {
  constructor(target, model) {
    super(target, model);
    this.model.subscribe(this.render.bind(this));
  }
  setEvent() {
    this.addEvent('click', 'button', (e) => {
      this.model.reset();
    });
  }

  getTemplate() {
    if (!this.model.isFinished()) return '';
    return `
    <div>
    <h2>🏆 최종 우승자: ${this.model.getWinners()} 🏆</h2>
    <div class="d-flex justify-center">
      <button type="button" class="btn btn-cyan">다시 시작하기</button>
    </div>
  </div>
        `;
  }
}
