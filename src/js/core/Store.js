import { DEFAULT_STORE_STATE } from '../constants.js';
import { deepDiffMapper, makeEnrollComponents } from '../utils/index.js';
/*
1. state를 전역의 객체로 가지고 있을 것이다.
2. getState, setState를 통해 해당 객체에 저장된 값을 업데이트 할 생각이다.
3. state 객체는 {이름: {값: '', enrollComponents: []}} 형태로 만들어보자!
4. Component class를 기반으로 돌아갈 것을 상상하고 만듦으로 this.render()를 활용할 것이다.

observer한 개념이나 내장된 함수 또는 자료형을 활용한 개발은 해당 건을 구현한 뒤 리팩토링과 수정을 거치면서 진행해보자.
*/

class Store {
  constructor() {
    this.state = { ...DEFAULT_STORE_STATE };
    this.enrollComponents = makeEnrollComponents(DEFAULT_STORE_STATE);
  }

  isExist = (name) => {
    if (this.state[name] === undefined)
      throw new Error('Store Error : 존재하지 않는 이름의 값입니다.');
  };

  updateEnrollComponents = (name, that) => {
    const enrollComponents = this.enrollComponents[name];

    if (!enrollComponents.includes(that)) {
      enrollComponents.push(that);
    }
  };
  //*FIXME: 한번에 모든 state를 반환하면 쓰는곳에서 편하게 사용이 가능할텐데 name마다 컴포넌트 등록을 할 수 가 없게 되는 것 해결 필요
  //*TODO: that(컴포넌트 클래스)을 인자로 따로 받지않고 넘겨받을 수 있는 방법을 생각해보자(apply??, caller??..)
  getState = ({ name, that }) => {
    this.isExist(name);
    this.updateEnrollComponents(name, that);

    return this.state[name];
  };

  setState = (nextState) => {
    const componentsSet = new Set();

    for (const [name, value] of Object.entries(nextState)) {
      this.isExist(name);
      //update value

      if (deepDiffMapper().check(this.state[name], value).isDiff) {
        this.state = { ...this.state, ...nextState };
      }

      //make rerender set

      this.enrollComponents[name].forEach((that) => {
        if (!that.render) {
          throw new Error('적합하지 않은 컴포넌트 형태입니다.');
        }

        componentsSet.add(that);
      });
    }

    [...componentsSet].forEach((component) => component.render());
  };
}

export default new Store();
