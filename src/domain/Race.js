class Race {
    static DEFAULT_ROUNDS = 5;

    constructor(cars, rounds = Race.DEFAULT_ROUNDS) {
        if (rounds < 1) {
            throw new Error("라운드는 1 이상이어야 합니다.");
        }
        this.cars = cars;
        this.rounds = rounds;
        this.raceResult = new RaceResult();
    }

    start() {
        for (let round = 1; round <= this.rounds; round++) {
            this.moveCars();
            this.raceResult.recordRound(round, this.cars);
        }
        return this.raceResult;
    }

    moveCars() {
        this.cars.forEach(car => car.moveForward());
    }
}

class RaceResult {
    constructor() {
        this.raceHistory = [];
    }

    recordRound(round, cars) {
        this.raceHistory.push({
            round,
            cars: cars.map(car => ({
                name: car.name.value,
                position: car.position.value,
            })),
        });
    }

    getWinners() {
        if (this.raceHistory.length === 0) {
            return [];
        }

        const finalRound = this.raceHistory[this.raceHistory.length - 1];
        const finalCars = finalRound.cars;
        const maxPositionValue = Math.max(...finalCars.map(car => car.position));

        return finalCars
            .filter(car => car.position === maxPositionValue)
            .map(car => car.name);
    }
}

export {RaceResult, Race};
