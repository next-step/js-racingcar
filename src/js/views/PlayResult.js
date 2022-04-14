import { hide } from '../../utils/dom.js';

const PlayResult = ($el, store) => {
  hide($el, true);

  store.subscribe({
    key: 'init',
    listeners: [() => hide($el, true)],
  });
};

export default PlayResult;
