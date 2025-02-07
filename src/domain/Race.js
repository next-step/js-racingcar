class Race {
    constructor(cars, rounds = 5) {
        this.cars = cars;
        this.rounds = rounds;
        this.raceResult = [];
    }

    start() {
        for (let round = 1; round <= this.rounds; round++) {
            this.moveCars();
            this.recordRoundResult(round);
        }
        return this.raceResult;
    }

    moveCars() {
        this.cars.forEach(car => car.moveForward());
    }

    recordRoundResult(round) {
        this.raceResult.push({
            round,
            cars: this.cars.map(({name, position}) => ({name, position}))
        });
    }
}

export default Race;
