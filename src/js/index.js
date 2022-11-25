import { $ } from './utils/selector.js';
import { onSubmitName, onSubmitTrialCount } from './event/eventHandler.js';

$('.car-name-submit-btn').addEventListener('click', event => onSubmitName(event));
$('.trial-submit-btn').addEventListener('click', event => onSubmitTrialCount(event));
