// import { debounceFrame } from '../utils/index.js';

const observer = (() => {
  let currentObserver = null;
  const observableMap = new Map();

  const observe = (fn) => {
    // currentObserver = debounceFrame(fn);
    currentObserver = fn;
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
        //*TODO: Depth가 깊은 State비교를 위해 Recursive diff function을 만들어서 활용할 필요가 있음
        console.log(
          'proxy set',
          `target:${name}`,
          target[name],
          'newVal:',
          value
        );
        if (JSON.stringify(target[name]) === JSON.stringify(value)) return true;

        target[name] = value;
        console.log({ observableMap });
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
