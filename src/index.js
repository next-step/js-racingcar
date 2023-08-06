const readline = require('readline')
const Game = require('./domain/Game.js')

const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const r2 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// game start
Game.register(r1);
Game.declareCount(r2);
Game.gameStart();
Game.congratulateWinner();
