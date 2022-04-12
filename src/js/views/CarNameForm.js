import { MESSAGE, MAX_LENGTH_FOR_CAR_NAME } from '../../const/index.js';
import SELECTOR from '../../const/selector.js';
import { $, disabled } from '../../utils/dom.js';
import { splitStringWithComma } from '../../utils/index.js';
import { carNamePattern } from '../../verification/regex.js';

const getCarNames = (carName) => splitStringWithComma(carName).filter(Boolean);

const validateCarName = (carNames) => {
  if (!carNames.length === 0) throw new Error(MESSAGE.PLZ_INSERT_CAR_NAME);

  const hasExceedLength = carNames.some(
    (carName) => carName.length > MAX_LENGTH_FOR_CAR_NAME
  );
  if (hasExceedLength)
    throw new Error(MESSAGE.PLZ_CHECK_MAX_LENGTH_FOR_CAR_NAME);

  const hasInvalidPattern = carNames.some(
    (carName) => carName.replace(carNamePattern, '').length === 0
  );
  if (hasInvalidPattern) throw new Error(MESSAGE.PLZ_CHECK_CAR_NAME_PATTERN);
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
