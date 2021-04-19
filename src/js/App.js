import CarList from "./components/CarList.js";

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

    carList.render(carNames);
  };

  initEventListener();
}
