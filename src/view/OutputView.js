class OutputView {

    getCarMoveProgress(car) {
        return "-".repeat(car.position);
    }

    getCarStatus(car) {
        return `${car.name} : ${this.getCarMoveProgress(car)}`;
    }

    printRaceResult(raceResult) {
        console.log("\n실행 결과");
        raceResult.forEach((roundData) => {
            this.printRoundStatus(roundData);
            console.log("");
        });
        console.log("경주를 완료했습니다.");
    }

    printRoundStatus(roundData) {
        roundData.cars.forEach(car => {
            console.log(this.getCarStatus(car));
        });
    }
}

export default OutputView;
