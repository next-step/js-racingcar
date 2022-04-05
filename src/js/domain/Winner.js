export default class Winner {
    static getWinner(cars) {
        let max = Math.max.apply(Math, cars.map((v) => v.forwardCount))
        console.log(max);
    }
}