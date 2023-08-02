import { SETTING } from "../constants/setting.js";
class Car {
	constructor(name) {
		this.name = name;
		this.position = 0;
	}

	get getName() {
		return this.name;
	}

	get getPosition() {
		return this.position;
	}

	move(randomValue) {
		if (randomValue >= SETTING.CAR_SETTING.CAN_MOVE_NUM) {
			this.position += 1;
		}
	}
}

export default Car;
