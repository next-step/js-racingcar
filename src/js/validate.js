export const isCorrectRange = (carName) => {
  return carName.every((element) => element.length >= 1 && element.length <= 5);
};
