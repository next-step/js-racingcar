export const debounceFrame = (callback) => {
  let currentCallback = -1;
  return () => {
    cancelAnimationFrame(currentCallback);
    currentCallback = requestAnimationFrame(callback);
  };
};

export const validateCarNames = (carNames) => {
  if (!carNames || !carNames.length) return;
  return carNames.every((el) => el.length > 1 && el.length <= 5);
};

export const splitingCarNames = (carNames) => {
  if (!carNames.length) return;
  return carNames.split(',');
};
