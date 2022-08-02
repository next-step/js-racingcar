import { ALERT_TEXT } from '../constants/constants.js';
import { $, $$ } from '../selector/DOM.js';
import { racingWinnerTemplate } from '../view/templates.js';
import { alertText, setVisible } from '../util/util.js';

const setVisibleRacingResult = () => {
  setVisible($('.competition-result'));
};

const getRacingWinners = () => {
  const cars = [...$$('.competition-list-item')].map((element) => {
    const [
      { innerHTML: name },
      {
        children: { length },
      },
    ] = element.children;
    return { name, processCount: length - 1 };
  });

  const maxProcessCount = Math.max(
    ...cars.map(({ processCount }) => processCount)
  );

  return cars
    .filter(({ processCount }) => processCount === maxProcessCount)
    .map(({ name }) => name)
    .join(',');
};

const getRacingResult = () => {
  setVisibleRacingResult();
  $('.winners').innerHTML = racingWinnerTemplate(getRacingWinners());
  alertText(ALERT_TEXT.RESULT_CELEBRATION);
};

export default getRacingResult;
