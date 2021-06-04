import Component from "../core/component.js";
import Car from "./Car.js";

class RaceResult extends Component {
  constructor($root, props, handlers) {
    super();
    this.$root = $root;
    this.props = props;
    this.handlers = handlers;

    this.state = { winner: [], isStopped: false };
  }

  setState() {}

  // props가 start 면 children도 설정해줘야함
  mount() {
    if (this.props.isStart) {
      this.children = this.props.cars.map((car) => {
        const $container = document.createElement("div");
        $container.className = "car";
        return new Car($container, { name: car, time: this.props.time });
      });
      this.children.forEach((child) => child.render());
    } else if (this.state.isStopped) {
      // 경기 끝 -> 이긴자식보여주기
    } else {
      this.$root.innerHTML = "";
    }
  }

  handleArrive(name, arriveTime) {
    // if (this.state.arriveTime !== -1 && this.state.arriveTime < arriveTime) {
    //   this.setState({ ...this.state, isStopped: true });
    // }
    // const nextWinners = [...this.state.winner, name];
    // this.setState({ ...this.state, winner: nextWinners, arriveTime });
    // // 이긴 자식 이름 받아와서 winner에 push 해줘야하는데...
    // // 자식이 여러명일 경우는 어떡하지 ? 하나 실행하면 바로 setState되서 끝날텐데
    // // 아니면... arriveTime 정해노혹
  }
}

// Car 컴포넌트를 자식으로 한다음에, names 만큼 해주는겨
// 그래서 Car 컴포넌트에서 각각 하도록 하는거쥐 ㅋ

export default RaceResult;
