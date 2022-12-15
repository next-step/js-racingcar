export const getRandom = (min, max) => {
  return Math.random() * (max - min) + min;
};

export const tab =
  (value) =>
  (...callbacks) => {
    callbacks.forEach((callback) => callback(value));
    return value;
  };

export const validate = (value, validations) => {
  tab(value)(...validations);
};

export const showErrorMessage = (error) => {
  alert(error.message);
};
