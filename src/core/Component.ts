import { ErrorMsg } from "./constants";

export default abstract class Component {
  public $target: Element;
  public state: Object;
  private props: Object;
  private isMounted: boolean;

  constructor($target: Element | null, props: Object = {}) {
    if ($target === null) {
      throw Error(ErrorMsg.CanNotBeNull);
    }
    this.isMounted = false;
    this.$target = $target;
    this.props = props;
    this.state = {};
    this.componentInit();
    this.render();
    this.isMounted = true;
  }

  componentInit() {}
  componentDidMount() {}
  componentDidUpdate() {}
  setState(nextState: Object) {}
  getInnerHTML() {
    return "";
  }
  render() {
    this.$target.innerHTML = this.getInnerHTML();
    if (this.isMounted) {
      this.componentDidUpdate();
    } else {
      this.componentDidMount();
    }
  }
}
