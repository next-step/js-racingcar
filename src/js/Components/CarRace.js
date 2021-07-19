import Component from '../Core/Component.js'

class CarRace extends Component {
  
  template() {
    return `
      <div class="mt-4 d-flex">
        <div class="mr-2">
          <div class="car-player">EAST</div>
          <div class="forward-icon mt-2">⬇️️</div>
          <div class="forward-icon mt-2">⬇️️</div>
        </div>
      </div>
    `
  }
}
