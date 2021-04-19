import CarList from "./components/CarList.js";
import {
  ERROR_MESSAGE,
  MIN_NAME_LENGTH,
  MAX_NAME_LENGTH,
} from "./utils/constnats.js";

export default function App() {
  const carNameInput = document.querySelector(".car-name-input");
  const carNameSubmitBtn = document.querySelector(".car-name-submit");
  const carList = CarList();

  const initEventListener = () => {
    carNameInput.addEventListener("keypress", onKeypressCarNameInput);
    carNameSubmitBtn.addEventListener("click", onClickCarNameSubmit);
  };

  const onKeypressCarNameInput = ({ target, key }) => {
    if (key !== "Enter" || !target.value) {
      return;
    }

    submitCarName();
  };

  const onClickCarNameSubmit = () => {
    submitCarName();
  };

  const submitCarName = () => {
    const carNames = carNameInput.value.replace(" ", "").split(",");
    if (carNames.filter(validateCarName).length) {
      alert(ERROR_MESSAGE.NAME_LENGTH);
      return;
    }

    carList.render(carNames);
  };

  const validateCarName = (name) =>
    name.length < MIN_NAME_LENGTH || name.length > MAX_NAME_LENGTH;

  initEventListener();
}
