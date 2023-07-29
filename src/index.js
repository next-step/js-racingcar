// get input from terminal using readlint
import { CarRacer } from './CarRacer.js';
import { MESSAGES } from './constants/index.js';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const carRacing = new CarRacer();

rl.question(`${MESSAGES.START}\n`, (input) => {
  try {
    carRacing.names = input;
  } catch (error) {
    console.log(error.message);
    rl.close();
  }
});
