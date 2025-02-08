import Car from './car';

class Race {
  static RACE_ROUNDS = 5;

  players;

  constructor(playerNames) {
    const playerNameArray = playerNames.split(',');
    players = playerNameArray.map((name) => new Car(name));
  }
}
