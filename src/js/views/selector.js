export const $name = {
    input: document.querySelector('.name-input'),
    button: document.querySelector('.name-btn')
}

export const $round = {
    container: document.querySelector('.round-container'),
    input: document.querySelector('.round-input'),
    button: document.querySelector('.round-btn')
}

export const $race = {
    container: document.querySelector('.race-container'),
    spinner: `<div class="d-flex justify-center mt-3">
                 <div class="relative spinner-container">
                     <span class="material spinner"></span>
                 </div>
             </div>`
}

export const $car = {
    container: `<div class="race-car mr-2"></div>`,
    player: `<div class="race-player"></div>`,
    forward: `<div class="forward-icon mt-2">⬇️️</div>`,
}

export const $winner = {
    container: document.querySelector('.winner-container'),
    player: document.querySelector('.winner-player'),
}

export const $reset = {
    button: document.querySelector('.btn-reset')
}