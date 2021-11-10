import {max} from '../utils.js';

export default class Game {
	// matrix테스트를 위해서 매트릭스 객체를 새로 선언하여 생성자 인자로 주입하는 방식을
	// 사용하였는데, 테스트를 위해서 matrix객체를 만드는게 맞는건가요?
	// 사실 matrix는 candidates와 round에 종속적인 데이터 뭉치인데, 이걸 바깥으로 뺀다면
	// 응집력은 낮아지는데 과연 이게 맞는건지...
	constructor(candidates, round, matrix) {
		this.candidates = candidates;
		this.round = round;
		this.matrix = matrix;
	}
	static goOrStop(number) {
		return number >= 4;
	}

	get candidates() {
		return this._candidates;
	}
	set candidates(arg) {
		this._candidates = arg;
	}
	get round() {
		return this._round;
	}
	set round(num) {
		this._round = num;
	}
	get matrix() {
		return this._matrix;
	}
	set matrix(mat) {
		this._matrix = mat;
	}
	getFootPrintsUntil = (seconds) => {
		const res = [];
		for (let col = 0; col < this.candidates.length; col++) {
			const racier = [];
			for (let row = 0; row < seconds; row++) {
				if (Game.goOrStop(this.matrix[row][col])) {
					racier.push('footprint');
				}
			}
			res.push(racier);
		}
		return res;
	};
	getFootPrintsAndSpinnerUnit = (seconds) => {
		const res = this.getFootPrintsUntil(seconds);
		return res.map((footprints) => [...footprints, 'spinner']);
	};

	calScoresGroupByCandidates(matrix, candidates) {
		const row = matrix.length,
			col = matrix[0].length;
		const res = Array(candidates.length).fill(0);

		for (let j = 0; j < col; j++) {
			for (let i = 0; i < row; i++) {
				res[j] += Game.goOrStop(matrix[i][j]);
			}
		}
		return res;
	}
	get winners() {
		const scores = this.calScoresGroupByCandidates(this.matrix, this.candidates);

		let maxScore = max(scores);

		return Array.from(this.candidates)
			.filter((name, index) => scores[index] === maxScore)
			.join(', ');
	}
}
