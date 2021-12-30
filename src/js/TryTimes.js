import { MESSAGE, CONSTANT } from "./utils/constants.js";

export default class TryTimes {
	constructor({ $inputTryTimesContainer, $inputTryTimes, $inputTryTimesButton, setTryTimes }) {
		this.$inputTryTimesContainer = $inputTryTimesContainer;
		this.$inputTryTimes = $inputTryTimes;
		this.$inputTryTimesButton = $inputTryTimesButton;

		const onConfirmTimes = (e) => {
			if (e.key === CONSTANT.ENTER) {
        const inputValue = e.target.valueAsNumber;
				if (inputValue > 0) {
					setTryTimes(inputValue);
					this.$inputTryTimes.disabled = true;
					this.$inputTryTimesButton.disabled = true;
				} else {
					alert(MESSAGE.TOO_SMALL_TRY_TIMES);
				}
			}
		};

		const onClickButton = () => {
			const inputValue = this.$inputTryTimes.valueAsNumber;
			if (inputValue > 0) {
				setTryTimes(inputValue);
				this.$inputTryTimes.disabled = true;
				this.$inputTryTimesButton.disabled = true;
      } else {
				alert(MESSAGE.TOO_SMALL_TRY_TIMES);
      }
		};

		this.$inputTryTimes.addEventListener("keydown", onConfirmTimes);
		this.$inputTryTimesButton.addEventListener("click", onClickButton);
	}

	showTryTimes() {
		this.$inputTryTimesContainer.classList.remove('hidden');
	}
}
