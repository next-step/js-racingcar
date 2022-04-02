export const publisher = () => {
  const observers = {};
  const subscribe = callback => {
    Object.keys(callback).forEach(_key => {
      observers[_key] = callback[_key];
    });
  };

  const notify = () => {
    Object.keys(observers).forEach(_key => {
      observers[_key]();
    });
  };

  return {
    subscribe,
    notify,
  };
};
