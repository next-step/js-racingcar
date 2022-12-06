import { handleAddEventListener } from '../utils/eventListener.js';
import CarModel from '../models/CarModel.js';
import RacingGameModel from '../models/RacingGameModel.js';
import { HAS_SAME_CAR_NAME_MESSAGE, INVALID_CAR_NAME_MESSAGE } from '../constants.js';
import { getCarNames } from '../utils/getCarNames.js';

const $carNamesInput = document.querySelector('#carNamesInput');
const $carNamesSubmitButton = document.querySelector('#carNamesSubmit');

const handleSubmitCarName = () => {
  const submittedNames = getCarNames($carNamesInput.value);

  submittedNames.forEach((submittedName) => {
    const enrolledCar = new CarModel();
    const isValidName = enrolledCar.isValidName(submittedName);
    if (!isValidName) {
      alert(INVALID_CAR_NAME_MESSAGE);
      return;
    }
    const hasSameName = enrolledCar.hasSameName(RacingGameModel.getCars(), submittedName);
    if (hasSameName) {
      alert(HAS_SAME_CAR_NAME_MESSAGE);
      return;
    }
    enrolledCar.enrollCar(submittedName);
    RacingGameModel.setCars(enrolledCar);
  });
};

export const initCarNameFormView = () => {
  handleAddEventListener({
    targetDom: $carNamesSubmitButton,
    event: 'click',
    callback: handleSubmitCarName,
  });
};
