import Component from "../../core/Component.js";
export default class DisplayContainer extends Component {
  selectPropsToUse() {
    this.selfProps = {};
  }
  getTemplate() {
    return `
    <div class="mt-4 d-flex">
    <div class="mr-2">
      <div class="car-player">A</div>
      <div class="forward-icon mt-2">⬇️️</div>
      <div class="forward-icon mt-2">⬇️️</div>
    </div>
    <div class="mr-2">
      <div class="car-player">B</div>
      <div class="forward-icon mt-2">⬇️️</div>
    </div>
    <div class="mr-2">
      <div class="car-player">C</div>
      <div class="d-flex justify-center mt-3">
        <div class="relative spinner-container">
          <span class="material spinner"></span>
        </div>
      </div>
    </div>
    <div class="mr-2">
      <div class="car-player">D</div>
      <div class="d-flex justify-center mt-3">
        <div class="relative spinner-container">
          <span class="material spinner"></span>
        </div>
      </div>
    </div>
  </div>
    `;
  }
  mountComponents() {
    // createChildComponent 함수에 생성자, targetSelector, getPropsFunction을 인자로 전달해서 실행하세요.
  }
  componentDidMount() {}
  setEventDelegation() {
    //addEventLinstener를 사용해서 self에 이벤트를 위임하세요.
  }
}
