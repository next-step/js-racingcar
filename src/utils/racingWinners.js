export const genResultArray = (racingResult) =>
  racingResult
    .at(-1)
    .split('\n')
    .map((s) => {
      const [racer, distance] = [s.split(' : ')[0], s.split(' : ')[1].length];
      return [racer, distance];
    });

export const genRacingWinners = (racingResult) => {
  const result = genResultArray(racingResult);
  const maxDistance = genMaxDistance(result);
  return result.filter(([_, distance]) => distance === maxDistance).map(([racer, _]) => racer);
};

export const genMaxDistance = (result) => {
  const distanceArr = result.map(([_, distance]) => distance);
  return Math.max(...distanceArr);
};
