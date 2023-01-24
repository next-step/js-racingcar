import printSpinner from './printSpinner.js';
import hideSpinner from './hideSpinner.js';

function renderRacingProcess(record) {
  const carPlayers = document.querySelectorAll('.car-player');

  carPlayers.forEach((carPlayer, idx) => {
    const carName = carPlayer.innerText;
    
    if(!record[carName]) return; 

    carPlayers[idx].insertAdjacentHTML(
      'afterend',
      `<div class="forward-icon mt-2">⬇️️</div>`
    );  
  });
}

export default function playRacing(racingRecords) {
  return new Promise((resolve) => {
    let count = 0;
    printSpinner();

    const timer = setInterval(() => {
      renderRacingProcess(racingRecords[count]);

      ++count;
      if(count === racingRecords.length) {
        clearInterval(timer);
        hideSpinner();
        resolve();
      }
    }, 1000);
  });
}