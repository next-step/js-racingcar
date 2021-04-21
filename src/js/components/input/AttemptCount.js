import Component from "../../core/Component.js";
export default class AttemptCount extends Component {
  selectPropsToUse() {
    const { gameState } = this.props;
    this.selfProps = { gameState };
  }
  getTemplate() {
    const { gameState } = this.selfProps;
    return gameState == !"waitName"
      ? `
    <p>시도할 횟수를 입력해주세요.</p>
    <div class="d-flex" id="attemptCountBox">
      <input type="number" class="w-100 mr-2" placeholder="시도 횟수" />
      <button type="button" class="btn btn-cyan">확인</button>
    </div>
   `
      : "";
  }
  mountComponents() {
    // createChildComponent 함수에 생성자, targetSelector, getPropsFunction을 인자로 전달해서 실행하세요.
  }
  componentDidMount() {}
  setEventDelegation() {
    //addEventLinstener를 사용해서 self에 이벤트를 위임하세요.
  }
}
