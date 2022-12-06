import { DEFAULT_STORE_STATE } from '../constants.js';
/*
1. state를 전역의 객체로 가지고 있을 것이다.
2. getState, setState를 통해 해당 객체에 저장된 값을 업데이트 할 생각이다.
3. state 객체는 {이름: {값: '', enrollComponents: []}} 형태로 만들어보자!
4. Component class를 기반으로 돌아갈 것을 상상하고 만듦으로 this.render()를 활용할 것이다.

observer한 개념이나 내장된 함수 또는 자료형을 활용한 개발은 해당 건을 구현한 뒤 리팩토링과 수정을 거치면서 진행해보자.
*/

const makeDefaultStateInForm = (defaultState) => {
  const object = {};
  for (const [key, value] of Object.entries(defaultState)) {
    object[key] = { value, enrollComponents: [] };
  }

  return object;
};

class Store {
  constructor() {
    this.state = makeDefaultStateInForm(DEFAULT_STORE_STATE);
  }

  isExist = (name) => {
    if (this.state[name] === undefined)
      throw new Error('Store Error : 존재하지 않는 이름의 값입니다.');
  };

  updateEnrollComponents = (name, that) => {
    const { enrollComponents } = this.state[name];

    if (!enrollComponents.includes(that)) {
      enrollComponents.push(that);
    }
  };

  getState = ({ name, that }) => {
    this.isExist(name);

    this.updateEnrollComponents(name, that);

    return this.state[name].value;
  };

  setState = (nextState) => {
    const names = Object.keys(nextState);
    const values = Object.values(nextState);
    const componentsSet = new Set();

    names.forEach((name, index) => {
      this.isExist(name);
      //update value
      this.state[name] = { ...this.state[name], value: values[index] };

      //make rerender set
      this.state[name].enrollComponents.forEach((that) => {
        console.log('!', that.render);
        if (!that.render) {
          throw new Error('적합하지 않은 컴포넌트 형태입니다.');
        }
        componentsSet.add(that);
      });
    });

    [...componentsSet].forEach((component) => component.render());
  };
}

const store = new Store();

export default store;
