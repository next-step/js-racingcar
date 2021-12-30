import { CONSTANT } from "./utils/constants.js";
import { isValidCarNames } from "./utils/services.js";

export default class CarNames {
	constructor({ $inputCarNames, $inputCarNamesButton, setCarNamesArray }) {
		this.$inputCarNames = $inputCarNames;
		this.$inputCarNamesButton = $inputCarNamesButton;

		const onConfirmName = (e) => {
			if (e.key === CONSTANT.ENTER) {
				const inputValue = e.target.value;
				if (isValidCarNames(inputValue)) {
					setCarNamesArray(inputValue.split(",").map((name) => name.trim()));
					e.target.disabled = true;
					this.$inputCarNamesButton.disabled = true;
				}
			}
		};
		const onClickButton = (e) => {
			const inputValue = this.$inputCarNames.value;
			if (isValidCarNames(inputValue)) {
				setCarNamesArray(inputValue.split(",").map((name) => name.trim()));
				e.target.disabled = true;
				this.$inputCarNames.disabled = true;
			}
		};

		this.$inputCarNames.addEventListener("keydown", onConfirmName);
		this.$inputCarNamesButton.addEventListener("click", onClickButton);
	}
}
