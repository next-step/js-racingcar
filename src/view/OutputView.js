class OutputView {
    getCarStatus(car) {
        return `${car.name} : ${"-".repeat(car.position)}`;
    }

    printRaceResult(raceResult) {
        console.log("\n실행 결과");

        raceResult.raceHistory.forEach((roundData) => {
            this.printRoundStatus(roundData);
            console.log("");
        });
        this.printWinners(raceResult.findWinners());
    }

    printRoundStatus(roundData) {
        roundData.cars.forEach(car => {
            console.log(this.getCarStatus(car));
        });
    }

    printWinners(winners) {
        const winnerNames = winners.map(carName => carName).join(", ");
        console.log(`${winnerNames}가 최종 우승했습니다.`);
    }
}

export default OutputView;
