import Car from './domain/car.js'

import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const carGame = new Car(rl);
const r2 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

Car.carCount(r2);
carGame.getName();
