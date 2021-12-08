import CarNamesForm from './components/CarNamesForm.js';
import TryCountsForm from './components/TryCountsForm.js';

window.onerror = function (msg) {
  alert(msg);
  return true;
};

new CarNamesForm().render();
new TryCountsForm().render();
