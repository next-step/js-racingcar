import Component from "../lib/Component.js";
import {$} from "../components/utils.js";

export default class Winner extends Component {
  template() {
    const {step, winners} = this.props;
    return step >= 3 ? (`
      <div>
        <h2>🏆 최종 우승자: <span id="winners">${winners.join(',')}</span> 🏆</h2>
        <div class="d-flex justify-center">
          <button id="reset" type="button" class="btn btn-cyan">다시 시작하기</button>
        </div>
      </div>
    `) : ('');
  }
  mounted() {
    const {step, winners, changeStep} = this.props;
    step >= 3 && Array.isArray(winners) && winners.length > 0 && setTimeout(() => {
      alert(`축하합니다!\n${winners.join(',')}님`);
    }, 2000);

    $('#reset') && $('#reset').addEventListener('click', () => changeStep({
      step: 1,
      cars: [],
      tryAmount: '',
      winners: []
    }));
  }
}