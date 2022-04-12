export default class Winner {
    static getWinners(cars) {
        const max = Math.max(...cars.map((v) => v.forwardCount));

        return cars.filter(car => car.forwardCount === max).map(car => car.value);
    }
}