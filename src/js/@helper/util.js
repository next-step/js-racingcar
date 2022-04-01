export const _interface_ = target =>
  new Proxy(JSON.parse(JSON.stringify(target)), {
    get(state, key, receiver) {
      return Reflect.get(state, key, receiver);
    },
    set(state, key, value, receiver) {
      if (!Object.keys(target).includes(key))
        throw new ReferenceError('인터페이스 규칙을 준수해주세요.');

      if (typeof value !== typeof target[key])
        throw new TypeError(`키 ${key}에 대응하는 값은 반드시 ${typeof target[key]}이어야 합니다.`);

      return Reflect.set(state, key, value, receiver);
    },
  });

export const removeSpaceArray = targets => targets.map(target => target.replace(/\s/gi, ''));

export const pipeline =
  (...fns) =>
  value =>
    fns.reduce((_value, fn) => fn(_value), value);

export const safeExecutor =
  handler =>
  (...args) => {
    try {
      handler(args);
    } catch (error) {
      alert(error.message);
      return null;
    }
  };
