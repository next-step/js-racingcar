import { MESSAGE, MAX_LENGTH_FOR_CAR_NAME } from '../../const/index.js';
import SELECTOR from '../../const/selector.js';
import { $, disabled } from '../../utils/dom.js';
import { last, splitStringWithComma } from '../../utils/index.js';
import { carNamePattern } from '../../verification/regex.js';

const validateCarName = (carName) => {
  if (carName?.length > MAX_LENGTH_FOR_CAR_NAME)
    throw new Error(MESSAGE.PLZ_CHECK_MAX_LENGTH_FOR_CAR_NAME);
};

const getCarNames = (carName) => splitStringWithComma(carName).filter(Boolean);

const CarNameForm = ($el, store) => {
  const $fieldset = $(SELECTOR.FIELDSET, $el);
  const $carName = $(SELECTOR.INPUT, $el);

  const mutateCarNames = () =>
    store.setState({
      carNames: getCarNames($carName.value),
    });

  const onSubmitCarName = (event) => {
    event.preventDefault();
    disabled($fieldset, true);
    mutateCarNames();
  };

  const getValidCarName = (target) => {
    const carName = target.value.replace(carNamePattern, '');
    const carNames = getCarNames(carName);
    const lastName = last(carNames)?.trim();

    try {
      validateCarName(lastName);
      return splitStringWithComma(carName).join(', ');
    } catch (error) {
      alert(error.message);

      carNames.pop();
      return carNames
        .concat(lastName.substring(0, MAX_LENGTH_FOR_CAR_NAME))
        .join(', ')
        .trim();
    }
  };

  const onKeyUpCarName = ({ target }) => {
    target.value = getValidCarName(target);
  };

  const init = () => {
    $el.addEventListener('submit', onSubmitCarName);
    $el.addEventListener('keyup', onKeyUpCarName);

    store.subscribe({
      key: 'init',
      actions: [() => disabled($el, false)],
    });
  };

  init();
};

export default CarNameForm;
