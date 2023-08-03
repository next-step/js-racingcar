import { Observable } from '../../src/utils/Observable'

describe('util/observable', () => {
  class Subject extends Observable {
    constructor(state) {
      super()
      this.state = state
    }

    getState() {
      return this.state
    }
  }
  class Observer extends Observable {
    constructor(spy) {
      super()
      this.spy = spy
    }

    listen(param) {
      this.spy(param)
    }
  }

  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('observable을 상속 받아서 이벤트를 청취할 수 있어야 한다.', () => {
    // Given
    const spy = jest.fn()
    const state = { key: 'key' }
    const subject = new Subject(state)
    const observer = new Observer(spy)

    // When
    subject.subscribe(observer.listen.bind(observer))
    subject.notify(state)

    // Then
    expect(spy).toBeCalledWith(state)
  })

  it('복수개의 청취자가 이벤트를 청취할 수 있어야 한다.', () => {
    // Given
    const spy1 = jest.fn()
    const spy2 = jest.fn()
    const state = { key: 'key' }
    const subject = new Subject(state)
    const observer1 = new Observer(spy1)
    const observer2 = new Observer(spy2)

    // When
    subject.subscribe(observer1.listen.bind(observer1))
    subject.subscribe(observer2.listen.bind(observer2))
    subject.notify(state)

    // Then
    expect(spy1).toBeCalledTimes(1)
    expect(spy2).toBeCalledTimes(1)
  })

  it('중복 청취인 경우, 기존의 리스너만 등록되어야 한다.', () => {
    // Given
    const spy = jest.fn()
    const state = { key: 'key' }
    const subject = new Subject(state)
    const observer = new Observer(spy)
    const listener = observer.listen.bind(observer)

    // When
    subject.subscribe(listener)
    subject.subscribe(listener)
    subject.notify(state)

    // Then
    expect(spy).toBeCalledTimes(1)
  })

  it('observable을 상속 받아서 이벤트를 청취 해제할 수 있어야 한다.', () => {
    // Given
    const spy = jest.fn()
    const subject = new Subject({ key: 'key' })
    const observer = new Observer(spy)
    const listener = observer.listen.bind(observer)

    subject.subscribe(listener)
    subject.unsubscribe(listener)

    // When
    subject.notify({ key: 'changed key' })

    // Then
    expect(spy).toBeCalledTimes(0)
  })

  it('청취하지 않은 이벤트는 청취 해제할 수 없어야 한다.', () => {
    // Given
    const spy1 = jest.fn()
    const spy2 = jest.fn()
    const subject = new Subject({ key: 'key' })
    const observer1 = new Observer(spy1)
    const observer2 = new Observer(spy2)
    const listener1 = observer1.listen.bind(observer1)
    const listener2 = observer2.listen.bind(observer2)

    subject.subscribe(listener1)
    subject.unsubscribe(listener2)

    // When
    subject.notify({ key: 'changed key' })

    // Then
    expect(spy2).toBeCalledTimes(0)
  })

  it('observable을 상속 받아서 모든 이벤트를 한번에 청취 해제할 수 있어야 한다.', () => {
    // Given
    const spy = jest.fn()
    const subject = new Subject({ key: 'key' })
    const observer = new Observer(spy)
    const listener1 = observer.listen.bind(observer)
    const listener2 = observer.listen.bind(observer)

    subject.subscribe(listener1)
    subject.subscribe(listener2)
    subject.unsubscribeAll()

    // When
    subject.notify({ key: 'changed key' })

    // Then
    expect(spy).toBeCalledTimes(0)
    expect(subject.listeners.length).toBe(0)
  })

  it('notify가 실행되는 경우, 청취하고 있는 이벤트가 호출 되어야 한다.', () => {
    // Given
    const spy = jest.fn()
    const subject = new Subject({ key: 'key' })
    const observer = new Observer(spy)
    const listener = observer.listen.bind(observer)

    subject.subscribe(listener)

    // When
    subject.notify({ key: 'changed key' })

    // Then
    expect(spy).toHaveBeenNthCalledWith(1, { key: 'changed key' })
  })
})
