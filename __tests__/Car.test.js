import { RANDOM_NUMBER_MAX } from '../src/domain/constants/index.js';
import CarModel from '../src/domain/model/CarModel.js';

describe('Car Instance Test', () => {
  it('given car names are should be same in car Instance', () => {
    // given
    const names = ['a', 'b', 'c'];
    const cars = names.map((name) => new CarModel(name));

    // then
    expect(cars.map((c) => c.getName())).toEqual(names);
  });

  it('should be able to move', () => {
    const names = ['a', 'b', 'c'];
    const cars = names.map((name) => new CarModel(name));

    // when
    cars.forEach((car) => car.move(RANDOM_NUMBER_MAX));

    // then
    expect(cars.map((c) => c.getPosition())).toEqual([1, 1, 1]);
  });
});