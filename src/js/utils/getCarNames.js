export const getCarNames = (inputValue) => {
  return inputValue.replaceAll(' ', '').split(',');
};
