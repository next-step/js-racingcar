import Component from "../../core/Component.js";
export default class ResultContainer extends Component {
  selectPropsToUse() {
    this.selfProps = {};
  }
  getTemplate() {
    return `
      <h2>🏆 최종 우승자: EAST, WEST 🏆</h2>
      <div class="d-flex justify-center">
        <button type="button" class="btn btn-cyan">다시 시작하기</button>
      </div>
    `;
    // 현 컴포넌트의 내부 html코드를 작성해서 return하세요.
  }
}
