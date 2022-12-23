import { debounceFrame, deepDiffMapper } from '../utils/index.js';

const observer = (() => {
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
