export const tab =
  (value) =>
  (...callbacks) => {
    callbacks.forEach((callback) => callback(value));
    return value;
  };
