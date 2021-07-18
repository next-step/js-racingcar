/// <reference types="cypress" />

import {
	genMatrix,
	getWinner,
	goOrStop,
} from '../../../../src/js/test-helper.js';

describe('game unit test', () => {
	context.only(
		'참가자 수와, round수를 입력하면, 결과 메트릭스와 우승자가 나타난다.',
		() => {
			[
				{ number: 0, go: false },
				{ number: 1, go: false },
				{ number: 2, go: false },
				{ number: 3, go: false },
				{ number: 4, go: true },
				{ number: 5, go: true },
				{ number: 6, go: true },
				{ number: 7, go: true },
				{ number: 8, go: true },
				{ number: 9, go: true },
			].forEach(({ number, go }) =>
				it(`'${number}'일때 ${go ? '전진' : '정기'}`, () => {
					const moveResult = goOrStop(number);
					expect(moveResult).to.eq(go);
				})
			);
			it(`${[
				[4, 0, 9],
				[1, 2, 5],
			]}, 참가자명단 [A,B,C]일때 우승자는 C이다.`, () => {
				const matrix = [
					[4, 0, 9],
					[1, 2, 5],
				];
				const candidates = ['A', 'B', 'C'];
				const winner = getWinner(matrix, candidates);
				expect(winner).to.eq('C');
			});
			it(`${[
				[9, 8, 7],
				[6, 3, 5],
			]}, 참가자명단 [A,B,C]일때 우승자는 'A, C'이다.`, () => {
				const matrix = [
					[9, 8, 7],
					[6, 3, 5],
				];
				const candidates = ['A', 'B', 'C'];
				const winner = getWinner(matrix, candidates);
				expect(winner).to.eq('A, C');
			});

			it('참가자3, round4일때, 4*3 매트리스가 나타나고 모두 다 0보다 크거나 같고 10보다 작다.', () => {
				const matrix = genMatrix(4, 3);
				matrix.forEach((row) =>
					row.forEach((item) => {
						expect(item + 0).lte(9);
						expect(item + 0).gte(0);
					})
				);
			});
		}
	);
});
