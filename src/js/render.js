// import { move } from '../utils/move.js'
import { state } from './state.js'

const renderCarListForm = () => {
  const $carListFormInput = document.querySelector('#carListForm input')
  const $carListFormButton = document.querySelector('#carListForm button')

  if (state.step >= 1) {
    $carListFormInput.setAttribute('disabled', true)
    $carListFormButton.setAttribute('disabled', true)
  } else {
    $carListFormInput.setAttribute('disabled', false)
    $carListFormButton.setAttribute('disabled', false)
  }
}

const renderGameCountForm = () => {
  const $gameCountForm = document.querySelector('#gameCountForm')
  const $gameCountFormInput = document.querySelector('#gameCountForm input')
  const $gameCountFormButton = document.querySelector('#gameCountForm button')

  if (state.step >= 2) {
    $gameCountForm.style.visibility = 'visible'
  } else {
    $gameCountForm.style.visibility = 'hidden'
  }

  if (state.step > 2) {
    $gameCountFormInput.setAttribute('disabled', true)
    $gameCountFormButton.setAttribute('disabled', true)
  }
}

const renderGameBoard = async () => {
  const $gameBoard = document.querySelector('#gameBoard')

  if (state.step >= 3) {
    $gameBoard.style.visibility = 'visible'
  } else {
    $gameBoard.style.visibility = 'none'
  }
}

const renderCars = () => {
  if (state.step < 3) {
    return
  }

  const $racingList = document.querySelector('#racingList')
  const $move = '<div class="forward-icon mt-2">⬇️</div>'

  let dom = ''

  state.cars.forEach((car) => {
    dom += `<div class="mr-2">`
    dom += `<div class="car-player">${car.name}</div>`
    dom += `${$move.repeat(car.position)}`
    dom += `${state.gameCount > 0 ? renderLoading() : ''}`
    dom += `</div>`
  })

  $racingList.innerHTML = dom
}

const renderLoading = () => {
  return `
    <div class="d-flex justify-center mt-3">
      <div class="relative spinner-container">
        <span class="material spinner"></span>
      </div>
    </div>`
}

const render = () => {
  renderCarListForm()
  renderGameCountForm()
  renderGameBoard()
  renderCars()
}

export default render
