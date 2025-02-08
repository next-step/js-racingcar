import Car from "../src/car.js";

it("자동차는 이름을 가진다.", () => {

    const car = new Car("NEXTSTEP");

    expect(car.name).toEqual("NEXTSTEP");

})

it("자동차는 초기에는 거리 0을 가진다.", () => {

    const car = new Car("NEXTSTEP");

    expect(car.distance).toEqual(0);

})

it("자동차를 전진시킨다.", () => {

    const car = new Car("NEXTSTEP");

    car.moveForward();

    expect(car.distance).toEqual(1);
    
})