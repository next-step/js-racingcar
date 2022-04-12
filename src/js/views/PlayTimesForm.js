import { MAX_TIMES_TO_PLAY, MESSAGE } from '../../const/index.js';
import SELECTOR from '../../const/selector.js';
import { $, hide, focus, disabled } from '../../utils/dom.js';

const validatePlayTimes = (playTimes) => {
  if (!playTimes) throw new Error(MESSAGE.PLZ_INSERT_PLAY_TIMES);

  if (playTimes > MAX_TIMES_TO_PLAY)
    throw new Error(MESSAGE.PLZ_CHECK_MAX_TIMES_TO_PLAY);
};

const PlayTimesForm = ($el, store) => {
  const $fieldset = $(SELECTOR.FIELDSET, $el);
  const $times = $(SELECTOR.INPUT, $el);

  const mutatePlayTimes = () => {
    const times = Number($times.value);

    store.setState({
      times,
    });
  };

  const onSubmitPlayTimes = (event) => {
    event.preventDefault();
    try {
      validatePlayTimes(Number($times.value));
      disabled($fieldset, true);
      mutatePlayTimes();
    } catch (error) {
      alert(error.message);
      $times.focus();
    }
  };

  const init = () => {
    hide($el, true);

    $el.addEventListener('submit', onSubmitPlayTimes);

    store.subscribe({
      key: 'init',
      listeners: [
        () => {
          hide($el, true);
          disabled($el, false);
        },
      ],
    });

    store.subscribe({
      key: 'carNames',
      listeners: [
        () => {
          hide($el, false);
          focus($times);
        },
      ],
    });
  };

  init();
};

export default PlayTimesForm;
