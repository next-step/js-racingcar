import { $ } from './utils/selector.js';
import {
  handleSubmitName,
  handleSubmitTrialCount,
  handleClickReset,
} from './event/eventHandler.js';

$('.name-form').addEventListener('submit', handleSubmitName);
$('.trial-form').addEventListener('submit', handleSubmitTrialCount);
$('.reset-btn').addEventListener('click', handleClickReset);
// 숨겨져 있어서 이벤트를 못건다.