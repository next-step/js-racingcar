import { $ } from './utils/selector.js';
import { handleSubmitName, handleSubmitTrialCount } from './event/eventHandler.js';

$('.car-name-submit-btn').addEventListener('click', event => handleSubmitName(event));
$('.trial-submit-btn').addEventListener('click', event => handleSubmitTrialCount(event));
