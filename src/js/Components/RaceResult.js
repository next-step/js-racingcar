import Component from '../Core/Component.js';

export class RaceResult extends Component {
  
  template() {
    const { getWinner } = this.props;
    const winnersName = getWinner();

    return winnersName ?  `
      <div id="result-container">
        <h2>🏆 최종 우승자: ${winnersName.join(', ')} 🏆</h2>
        <div class="d-flex justify-center">
          <button type="button" class="btn btn-cyan">다시 시작하기</button>
        </div>
      </div>
    ` : '';
  }

  render() {
    this.$target.innerHTML = this.template();  
  }

  setState() {
    const { getWinner} = this.props;
    if( getWinner() ) {
      this.render();
      this.setEvent();
    }
  }

  setEvent() {
    const { reset } = this.props;
    this.addEvent('click','#result-container button', () => {
      reset();
    })
  }
}