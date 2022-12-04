import { $ } from './utils/selector.js';
import { handleSubmitName, handleSubmitTrialCount } from './event/eventHandler.js';

$('.name-form').addEventListener('submit', handleSubmitName);
$('.trial-form').addEventListener('submit', handleSubmitTrialCount);
