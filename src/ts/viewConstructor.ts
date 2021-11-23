import { AnyObj } from './constants.js'
import { getStore, PartialState, State } from './store/index.js'
import Connect from './store/connect.js'

const eventErrorCatcher = (handler: any) => (e: CustomEvent) => {
  try {
    handler(e)
  } catch (err) {
    console.error(err)
    window.alert(err.message)
  }
}

export class View extends HTMLElement {
  events = new Map()
  viewStore: Connect
  watch?(state: State): AnyObj
  onStoreUpdated(updatedState: any, totalState: State): void {}

  observe() {
    if (this.watch) {
      this.viewStore = new Connect(this, this.watch)
      getStore().observe(this.viewStore)
    }
  }

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
  hide() {
    this.style.display = 'none'
    return this
  }
  show() {
    this.style.display = ''
    return this
  }

  connectedCallback() {
    this.observe()
  }

  disconnectedCallback() {
    if (this.watch) {
      getStore().unobserve(this.viewStore)
    }
  }
}
