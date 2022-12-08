export const decideMoveCar = (cars) => {
  return cars.map(() => {
    const randomNumber = Math.floor(Math.random() * 10);
    return randomNumber > 3;
  })
};

export const getRacingResult = (attemptNumber, cars) => {
  const result = [];
  Array.from({ length: attemptNumber }, () => {
    result.push(decideMoveCar(cars));
  })
  return result;
}

export const getWinners = (cars) => {
  let maxForwardCount = 0;
  let winners = '';
  cars.forEach(car => {
    const carName = car.trim();
    const forwardCount = document.querySelectorAll(`.${carName} > div.forward-icon`).length
    if (forwardCount > maxForwardCount) {
      maxForwardCount = forwardCount;
      winners = car;
      return 
    }

    if (forwardCount === maxForwardCount) {
      winners += `, ${carName}`
      return
    }
  });
  return winners;
}
