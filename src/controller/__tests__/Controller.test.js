import {Controller} from '../Controller';

describe('Controller class test', () => {
  test('자동차 이름은 5자 이하만 가능하다.', () => {
    const controller = new Controller();

    const validCarNames = ['pobi', 'crong', 'honux'];
    expect(controller.isValidCarNames(validCarNames)).toBe(true);

    const invalidCarNames = ['pobi', 'crong', 'honux1'];
    expect(controller.isValidCarNames(invalidCarNames)).toBe(false);
  });
});
