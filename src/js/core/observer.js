//* UNUSED: replace with Store.js
import { debounceFrame, deepDiffMapper } from '../utils/index.js';

const observer = (() => {
  //*Reference: https://junilhwang.github.io/TIL/Javascript/Design/Vanilla-JS-Store/#_2-component%E1%84%85%E1%85%A9-%E1%84%8E%E1%85%AE%E1%84%89%E1%85%A1%E1%86%BC%E1%84%92%E1%85%AA%E1%84%92%E1%85%A1%E1%84%80%E1%85%B5
  let currentObserver = null;
  const observableMap = new Map();

  const observe = (fn) => {
    currentObserver = debounceFrame(fn);
    fn();
    currentObserver = null;
  };

  const observable = (obj) => {
    return new Proxy(obj, {
      get(target, name) {
        if (!observableMap.has(name)) observableMap.set(name, new Set());
        if (currentObserver) {
          observableMap.set(
            name || '',
            new Set([...(observableMap.get(name) || []), currentObserver])
          );
        }

        return target[name];
      },
      set(target, name, value) {
        if (target[name] === value) return true;
        if (!deepDiffMapper().check(target[name], value).isDiff) return true;

        target[name] = value;
        observableMap.get(name).forEach((fn) => fn());
        return true;
      },
    });
  };

  return {
    observable,
    observe,
  };
})();

export default observer;
