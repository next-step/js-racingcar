class Car {
  constructor (name) {
    this.name = name
  }
}

export const generateCars = (carNames) => {
  const cars = carNames.map((name) => new Car(name))
  return cars;
}
