import Car from '../src/Car';
import Race from '../src/Race';

const getLogSpy = () => {
	const logSpy = jest.spyOn(console, 'log');
	logSpy.mockClear();
	return logSpy;
};

describe('자동차 입출력 테스트', () => {
	test('전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다', () => {
		// given
		jest.spyOn(Math, 'random').mockReturnValue(0.4);
		const car = new Car('huru');
		const randomValue = Math.floor(Math.random() * 10);
		const race = new Race();
		race.start();

		const logSpy = getLogSpy();

		// when
		for (let i = 0; i < race.playNumber; i++) {
			car.move(randomValue);
		}

		// then
		expect(logSpy).toHaveBeenCalledWith('huru: --');
		Math.random.mockRestore();
	});

	test('우승자가 여러 명일 경우 쉼표를 이용하여 구분한다', () => {
		// given
		const competitors = [
			{ name: 'seol', position: 1 },
			{ name: 'tang', position: 2 },
			{ name: 'huru', position: 2 }
		];
		const race = new Race(competitors);

		// when
		race.start();

		// then
		expect(race.winner).toEqual('tang, huru');
	});

	test('사용자가 잘못된 입력 값을 작성한 경우 프로그램을 종료한다', () => {
		// given
		const car = new Car('$%!@#$');
		const race = new Race(car);

		// when
		// then
		expect(() => race.start().toThrow());
	});
});
