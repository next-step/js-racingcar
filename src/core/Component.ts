export default abstract class Component {
  public $target: HTMLElement;
  private props: Object;
  private isMounted: boolean;

  constructor($target: HTMLElement, props: Object = {}) {
    this.isMounted = false;
    this.$target = $target;
    this.props = props;
    this.componentInit();
    this.render();
    this.isMounted = true;
  }

  componentInit() {}
  componentDidMount() {}
  componentDidUpdate() {}
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
