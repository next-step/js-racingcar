import { hide } from '../../utils/dom.js';

const PlayResult = ($el, store) => {
  hide($el, true);

  store.subscribe({
    key: 'init',
    actions: [() => hide($el, true)],
  });
};

export default PlayResult;
