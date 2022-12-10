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

export const isEmpty = (value) => {
  return value === '';
};

export const isInvalidLength = (value, min, max) => {
  return value.length < min || value.length > max;
};

export const isInValidName = (name, min, max) => {
  return name.some(
    (_name) => isEmpty(_name) || isInvalidLength(_name, min, max)
  );
};

export const duplicatedName = (name) => {
  return name.length !== new Set(name).size;
};

export const isInvalidMinNumber = (value, min) => {
  return value < min;
};
