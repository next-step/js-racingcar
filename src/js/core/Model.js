// 기본적으로 state Property를 가지고 있다.
// subscribe로 등록해 뭔가 Model에 변화가 있을 때마다 알려줘야한다.
class Model {
  subscribers = [];

  constructor() {

  }

  dispatch() {
    // override
  }

  subscribe = (subscriber) => {
    this.subscribers.push(subscriber);
  }
}
