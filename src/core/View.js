import { $ } from '../utils/selector.js'

export default class View {
  constructor(app, props) {
    this.$app = $(app)
    this.props = props
  }
  template = () => {}
  mount = () => {}
  addEvent = () => {}
  render = () => {
    this.$app.innerHTML = this.template()
  }
}
