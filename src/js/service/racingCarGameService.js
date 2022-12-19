const playOneRacingGame = async (racingCars) => {
  let requests = racingCars.map((car) => {
    return car.run();
  });

  const responses = await Promise.all(requests);
  return responses;
};

export { playOneRacingGame };
