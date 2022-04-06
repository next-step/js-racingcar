import SELECTOR from '../../const/selector.js';
import { $, hide, focus, disabled } from '../../utils/dom.js';

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
    disabled($fieldset, true);
    mutatePlayTimes();
  };

  const init = () => {
    hide($el, true);

    $el.addEventListener('submit', onSubmitPlayTimes);

    store.subscribe({
      key: 'init',
      actions: [
        () => {
          hide($el, true);
          disabled($el, false);
        },
      ],
    });

    store.subscribe({
      key: 'carNames',
      actions: [
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
