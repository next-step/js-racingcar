import CarModel from '../src/model/CarModel.js';
import { WinnerModel } from '../src/model/WinnerModel.js';

describe('WinnerModel Instance Test', () => {
  test('shoud be able to return the most fast car(s)', () => {
    // given
    const names = ['a','b','c'];
    const cars = names.map((name) => new CarModel(name));

    // when
    cars.forEach((car, index) => index === 1 ? car.move() : car )

    // then
    expect(new WinnerModel(cars).winners).toEqual([cars[1].getName()]);
  });
});

