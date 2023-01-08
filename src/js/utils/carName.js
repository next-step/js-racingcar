export const splitingCarNames = (carNames) => {
  const copyName = carNames;

  if (!carNames.length) return [];
  return copyName.split(',').filter((name) => name.trim());
};
