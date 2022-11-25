import { $ } from './utils/selector.js';
import { onNameSubmit } from './event/eventHandler.js';

$('.car-name-submit-btn').addEventListener('click', event => onNameSubmit(event));

