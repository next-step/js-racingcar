import { MESSAGE, CONSTANT } from "./utils/constants.js";
import { isValidCarNames } from "./utils/services.js";

export default class CarNames {
	constructor({
		carNamesArray,
		$inputCarNames,
		$inputCarNamesButton,
		setCarNamesArray,
	}) {
		this.carNamesArray = carNamesArray;
		this.$inputCarNames = $inputCarNames;
		this.$inputCarNamesButton = $inputCarNamesButton;

		const onConfirmName = (e) => {
			if (e.key === CONSTANT.ENTER) {
				console.log(e.target.value);
				const inputValue = e.target.value;
				if (isValidCarNames(inputValue)) {
          setCarNamesArray(inputValue.split(",").map((name) => name.trim()));
          e.target.disabled = true;
          this.$inputCarNamesButton.disabled = true;
				}
			}
		};
		const onClickButton = (e) => {
			console.log(this.$inputCarNames.value);
			const inputValue = this.$inputCarNames.value;
			if (isValidCarNames(inputValue)) {
				setCarNamesArray(inputValue.split(",").map((name) => name.trim()));
        e.target.disabled = true;
        this.$inputCarNames.disabled =  true;
			}
		};

		this.$inputCarNames.addEventListener("keydown", onConfirmName);
		this.$inputCarNamesButton.addEventListener("click", onClickButton);
  }
  
  // setCarNames(nextCarNamesArray) {
  //   this.carNamesArray = nextCarNamesArray;
  // }
}
