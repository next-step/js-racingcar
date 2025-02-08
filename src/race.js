import Car from './car.js';

class Race {
  static RACE_ROUNDS = 5;

  players;

  constructor(playerNames) {
    const playerNameArray = playerNames.split(',');
    this.players = playerNameArray.map((name) => new Car(name));
  }

  proceed() {
    this.players.forEach((player) => player.forward());
    return this.players.map((player) => player.status);
  }

  start() {
    let result = [];

    for (let i = 0; i < Race.RACE_ROUNDS; i++) {
      const roundResult = this.proceed();
      result.push(roundResult);
    }

    return result;
  }
}

export default Race;
