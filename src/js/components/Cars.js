import {selector} from "../utils/util.js";
import {
  DELAY_TIME,
  MESSAGE,
  MOVE_POSSIBLE_NUMBER,
  TEMPLATE
} from '../utils/constant.js'

class Cars {
  constructor({carNames, count }) {
    this.$parent = selector('#game-process-component')
    this.players = carNames
    this.count = count

    this.render()
  }

  render = () => {
    this.makeCarStatus()
  }

  makeCarStatus = () => {
    const template = this.players.reduce((html, {name, id}) => {
      html += TEMPLATE.CAR_STATUS(name, id)
      return html
    }, '')
    this.$parent.insertAdjacentHTML('beforeend', TEMPLATE.CAR_BOARD(template))
    this.timer(DELAY_TIME.PROCESSING_TIME, this.count)
  }

  makeRandomNum = () => {
    return Math.floor(Math.random() * 10)
  }

  insertMove = (id) => {
    selector(`div[data-id="${id}"] > div`, this.$parent).insertAdjacentHTML('afterend', TEMPLATE.CAR_MOVE)
  }

  clearSpinner = (id) => {
    const target = selector(`div[data-id="${id}"]`, this.$parent)
    target.removeChild(target.lastElementChild)
  }

  showWinnerAlert = () => {
    setTimeout(() => alert(MESSAGE.WINNER_ALERT), DELAY_TIME.WINNER_TIME)
  }

  moveCar = (player) => {
    if (this.makeRandomNum() > MOVE_POSSIBLE_NUMBER) {
        player.count += 1;
        this.insertMove(player.id)
      }
    return false;
  }


  timer(time = 1000, count) {
    // let startTime = new Date().getTime();
    // let i = 0;
    // const callback = ()  => {
    //   const currentTime = new Date().getTime();
    //   if (currentTime - 1000 > startTime) {
    //     console.log("timer end");
    //     let html = ''
    //     this.result = []
    //     for (let i = 1; i < 5; i++) {
    //       this.insertMove(i)
    //       if (this.makeRandomNum() > 3) {
    //         html = TEMPLATE.CAR_MOVE
    //       } else {
    //       }
    //       this.result.push(html)
    //     }
    //     console.log(this.result)
    //   } else {
    //     // console.log(i++, startTime);
    //     requestAnimationFrame(callback);
    //   }
    // };
    // requestAnimationFrame(callback);

    if (count < 1) {
      this.players.forEach(player => this.clearSpinner(player.id))
      selector('#game-result-component').innerHTML = TEMPLATE.WINNER(this.players)
      this.showWinnerAlert();
      return false
    } else {
      count -= 1
      setTimeout(() => {
        this.players.forEach(this.moveCar)
        this.timer(1000, count)
      }, time)
    }
  }

}

export default Cars;
