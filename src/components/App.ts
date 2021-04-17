import Component from "../core/Component";

export default class App extends Component {
  constructor($target: Element | null) {
    super($target);
  }

  getInnerHTML() {
    return "Hello world";
  }
}
