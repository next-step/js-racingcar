import { MESSAGE, MAX_LENGTH_FOR_CAR_NAME } from '../../const/index.js';
import SELECTOR from '../../const/selector.js';
import { $, disabled } from '../../utils/dom.js';
import { splitStringWithComma } from '../../utils/index.js';

const getCarNames = (carName) => splitStringWithComma(carName).filter(Boolean);

const validateCarName = (carNames) => {
  if (!carNames.length === 0) throw new Error(MESSAGE.PLZ_INSERT_CAR_NAME);

  if (carNames.some((carName) => carName.length > MAX_LENGTH_FOR_CAR_NAME))
    throw new Error(MESSAGE.PLZ_CHECK_MAX_LENGTH_FOR_CAR_NAME);

  return true;
};

const CarNameForm = ($el, store) => {
  const $fieldset = $(SELECTOR.FIELDSET, $el);
  const $carName = $(SELECTOR.INPUT, $el);

  const mutateCarNames = (carNames) =>
    store.setState({
      carNames,
    });

  const onSubmitCarName = (event) => {
    event.preventDefault();
    const carNames = getCarNames($carName.value.trim());
    try {
      validateCarName(carNames);
      mutateCarNames(carNames);
      disabled($fieldset, true);
    } catch (error) {
      alert(error.message);
      focus($carName);
    }
  };

  $el.addEventListener('submit', onSubmitCarName);

  store.subscribe({
    key: 'init',
    listeners: [() => disabled($el, false)],
  });
};

export default CarNameForm;
