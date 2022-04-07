export default class Winner {
    static getWinners(cars) {
        const max = Math.max.apply(Math, cars.map((v) => v.forwardCount));

        return cars.filter(car => {return car.forwardCount === max}).map(car => car.value);
    }
}