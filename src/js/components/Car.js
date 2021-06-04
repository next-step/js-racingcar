import Component from "../core/component.js";

// props로 받을 것
// $parent 받아오기 -> parent에다 붙여줘야함
// name
// isStopped < - 도착한 놈 있으면 isStopped props가 변경되서 레이싱 중지
// handlers로 받아올 것
// onArrive

class Car extends Component {
  constructor($root, props, handlers) {
    super();
    this.$root = $root;
    this.props = props;
    this.handlers = handlers;
  }

  mount() {
    console.log("자식 자동차 생성 완료~", this.props.name);
  }
}

export default Car;
