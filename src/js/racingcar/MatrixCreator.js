export default class MatrixCreator {
	constructor(row, col) {
		this.row = row;
		this.col = col;
	}
	get row() {
		return this._row;
	}
	set row(num) {
		this._row = num;
	}
	get col() {
		return this._col;
	}
	set col(num) {
		this._col = num;
	}
	/**
	 * default min:0, max:9  추상화 가능
	 */
	matrix(min = 0, max = 9) {
		return Array.from(Array(this.row), () =>
			Array(this.col).fill(Math.random() * (max - min) + min)
		);
	}
}
