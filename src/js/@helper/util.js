export const declareInterface = target =>
  new Proxy(target, {
    set: (state, key, value) => {
      if (!Object.keys(target).includes(key))
        throw new ReferenceError('인터페이스 규칙을 준수해주세요.');

      if (typeof value !== typeof target[key])
        throw new TypeError(`키 ${key}에 대응하는 값은 반드시 ${typeof target[key]}이어야 합니다.`);

      state[key] = value;
      return true;
    },
  });

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
