import { $ } from '../Utils/util.js';

export default class Component {
  $target;
  props;
  state;

  constructor(target, props) {
    this.$target = $(target);
    this.props = props
    this.setup()
    this.render()
    this.setEvent()
  }
  setup(){}
  
  template() {
    return ``;
  }

  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }
  
  mounted() {}
  setEvent() {}

  addEvent(eventType, selector, eventHandler) {
    const $children = [...this.$target.querySelectorAll(selector)];

    const isTarget = (target) => $children.includes(target)
                                  || target.closest(selector);

    this.$target.addEventListener(eventType, event => {
      if (!isTarget(event.target)) return false;
      eventHandler(event);
    })                              
  }

  setState(newState) {
    this.state = newState;
    this.render();
  }
}