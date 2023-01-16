import Car from '../domain/Car.js';

export default function registerCar(carName) {
  if(Array.isArray(carName)) return;
  
  return carName.split(',')
                .map(it => new Car(it.trim()));
}