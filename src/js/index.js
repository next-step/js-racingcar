import { $ } from './utils/selector.js';
import { handleSubmitName, handleSubmitTrialCount } from './event/eventHandler.js';

$('.name-form').addEventListener('submit', event => handleSubmitName(event));
$('.trial-form').addEventListener('submit', event => handleSubmitTrialCount(event));
