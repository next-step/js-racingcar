export const debounceFrame = (callback) => {
  let currentCallback = -1;
  return () => {
    cancelAnimationFrame(currentCallback);
    currentCallback = requestAnimationFrame(callback);
  };
};

export const validateCarNames = (carNamesArray) => {
  if (!carNamesArray || !carNamesArray.length) return;

  return carNamesArray
    .filter((name) => Boolean(name) === true)
    .every((el) => el.length > 1 && el.length <= 5);
};

export const splitingCarNames = (carNames) => {
  if (!carNames.length) return;
  return carNames.split(',').filter((name) => name.trim());
};
