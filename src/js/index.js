import { $formCarName, $formTryCount } from './selector.js';
import { handleWriteCarName, handleWriteTryCount } from './racing.js';

$formCarName.addEventListener('submit', handleWriteCarName);
$formTryCount.addEventListener('submit', handleWriteTryCount);
