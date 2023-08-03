export class Observable {
  constructor() {
    this.listeners = []
  }

  subscribe(callback) {
    const listeners = this.listeners

    if (listeners.includes(callback)) {
      return
    }

    listeners.push(callback)
  }

  unsubscribe(callback) {
    if (!this.listeners.includes(callback)) {
      console.error('청취하지 않은 이벤트는 해제할 수 없습니다!')
      return
    }

    this.listeners = this.listeners.filter(listener => listener !== callback)
  }

  unsubscribeAll() {
    this.listeners = []
  }

  notify(state) {
    this.listeners.forEach(listener => listener(state))
  }
}
