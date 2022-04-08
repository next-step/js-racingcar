const racingCar = () => {
  let lap;
  const cars = [];

  function setLap(value) {
    lap = parseInt(value, 10);
  }

  function getLap() {
    return lap;
  }

  function addCar(name) {
    cars.push({
      name: name.trim(),
      data: [],
    });
  }

  function getCars() {
    return cars;
  }

  function getLastRacingData() {
    return cars.map(({ name, data }) => {
      return {
        name,
        data: data[data.length - 1],
      };
    });
  }

  function racing() {
    cars.forEach(({ data }) => {
      const value = parseInt(Math.random() * 10, 10);
      data.push(value);
    });

    return getLastRacingData();
  }

  return {
    setLap,
    getLap,
    addCar,
    getCars,
    racing,
  };
};

export default racingCar();
