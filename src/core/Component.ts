export default abstract class Component<T = {}> {
  public $target: HTMLElement;
  public props?: T;
  private isMounted: boolean;

  constructor($target: HTMLElement, props?: T) {
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
