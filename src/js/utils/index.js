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
    .every((el) => el.length >= 1 && el.length < 6);
};

export const splitingCarNames = (carNames) => {
  console.log(carNames);
  if (!carNames.length) return [];
  return carNames.split(',').filter((name) => name.trim());
};

const makeRandomNumber = (minValue = 0, maxValue = 9) => {
  return Math.floor(Math.random() * maxValue + minValue);
};

export const getProgressOrNot = () => {
  return makeRandomNumber() > 4;
};

export const waitUntil = (delay) =>
  new Promise((resolve) => setTimeout(resolve, delay));

export const checkRacingIntheEnd = ({ racingMap, trialNumber }) => {
  if (!racingMap.size) return false;

  return [...racingMap.values()].some(
    (progressArray) =>
      progressArray.filter((el) => el === true).length === trialNumber
  );
};

export const makeNewRacingMap = (prevRacingMap) => {
  console.log({ prevRacingMap });
  if (!prevRacingMap.size) return prevRacingMap;
  const updatedRacingMap = new Map([...prevRacingMap]);

  [updatedRacingMap.keys()].forEach((key) => {
    updatedRacingMap.set(key, [
      ...updatedRacingMap.get(key),
      getProgressOrNot(),
    ]);
  });

  console.log({ prevRacingMap }, { updatedRacingMap });
  return updatedRacingMap;
};
