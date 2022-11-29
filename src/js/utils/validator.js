export const isNotEmpty = (value) => {
  return value !== '';
};

export const isValidLength = (value, min, max) => {
  return value.length >= min && value.length <= max;
};

export const isValidNumber = (value, min) => {
  return value >= min;
};

export const isValidName = (name, min, max) => {
  return name.every(
    (_name) => isNotEmpty(_name) && isValidLength(_name, min, max)
  );
};
