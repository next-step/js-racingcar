import { AnyObj, Elem, State } from '../types.js'
import ViewStore from '../store/viewStore.js'
import el from '../util/dom.js'
import errorHandler from '../util/errorHandler.js'

const eventErrorCatcher = (handler: any) => (e: CustomEvent) => {
  try {
    handler(e)
  } catch (err) {
    errorHandler('view', err)
  }
}

export default abstract class View extends HTMLElement {
  events = new Map()
  viewStore: ViewStore
  watch?(state: State): AnyObj
  onStoreUpdated(updatedState: any, totalState: State): void {}

  on(eventType: string, handler: (e: CustomEvent) => any) {
    let cb = this.events.get(handler)
    if (!cb) {
      cb = eventErrorCatcher(handler)
      this.events.set(handler, cb)
    }
    this.addEventListener(eventType, cb)
    return this
  }
  off(eventType: string, handler: (e: CustomEvent) => any) {
    const cb = this.events.get(handler)
    this.removeEventListener(eventType, cb)
    return this
  }
  dispatch(actionType: string, data: AnyObj = {}) {
    const event = new CustomEvent('dispatch', { detail: { actionType, data }, bubbles: true })
    this.dispatchEvent(event)
    return this
  }
  render(children: Elem | Elem[]) {
    el(this, children instanceof Array ? children : [children])
    return this
  }
  hide() {
    this.style.display = 'none'
    return this
  }
  show() {
    this.style.display = ''
    return this
  }

  connectedCallback() {
    if (this.watch) {
      this.viewStore = new ViewStore(this)
    }
  }

  disconnectedCallback() {
    if (this.watch) {
      this.viewStore.deregister()
    }
  }
}
