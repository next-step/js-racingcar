window.onerror = function (msg) {
  alert(msg);
  return true;
};

import CarNamesForm from './components/CarNamesForm.js';
import TryCountsForm from './components/TryCountsForm.js';

new CarNamesForm().render();
new TryCountsForm().render();
