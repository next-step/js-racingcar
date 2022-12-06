export const getNumberList = (max) => {
  return Array(max + 1)
    .fill()
    .map((number, idx) => idx);
};

export const shuffle = (array, count) => {
  return array.sort(() => Math.random() - 0.5).slice(0, count);
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
