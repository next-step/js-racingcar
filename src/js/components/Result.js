import Component from '../core/Component.js';

class Result extends Component {
  template() {
    return /*html*/ `
      <div>
        <h2>🏆 최종 우승자: EAST, WEST 🏆</h2>
        <div class="d-flex justify-center">
          <button type="button" class="btn btn-cyan">다시 시작하기</button>
        </div>
      </div>
  `;
  }
}

export default Result;
