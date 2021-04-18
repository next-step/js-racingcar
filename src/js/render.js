import { allSelector, selector } from './utils/util.js'
import { TEMPLATE } from './utils/constant.js'
let changeListeners = [];
export function subscribe(callbackFunction) {
  changeListeners.push(callbackFunction);
}

function publish() {
  changeListeners.forEach(changeListener => changeListener());
}
class Game {
  constructor (parent) {
    this.parent = parent

    this.init()
  }

  init () {
    new Panel(this.parent)
  }
}

class Panel {
  constructor (parent) {
    this.$parent = parent
    this.showCountComponent = false

    this.render()
    subscribe(this.render)
  }

  render = ()  => {
    console.log(this)
    this.$parent.innerHTML = '';
    this.$parent.insertAdjacentHTML('afterbegin', TEMPLATE.INPUT_NAME_COUNT)
    this.addDomEvent()
  }

  addDomEvent () {
    this.$panel = selector('#game-input-panel-component', this.$parent)
    this.$panel.addEventListener('click', this.handlePanelClick)

  }

  handlePanelClick = ({ target }) => {
    if (target.classList.contains('car-player-btn')) {
      return this.addCarPlayers(target.closest('.add-car-players'))
    }

    if (target.classList.contains('play-count-btn')) {
      return this.inputRacingCount(target.closest('.input-racing-count'))
    }
  }

  showInputCount () {
    this.showCountComponent = true
    selector('.car-racing-count', this.$panel).classList.remove('hidden')
  }

  addCarPlayers (target) {
    this.carNames = selector('input', target).value.split(',')
    const isValid = this.carNames.every(name => (name.length > 0 && name.length < 6))
    if (this.carNames.length > 0 && isValid) {
      return !this.showCountComponent && this.showInputCount()
    }
  }

  inputRacingCount (target) {
    this.playCount = selector('input', target).value
    const isValid = this.playCount > 0
    if (isValid) {
      new Car(this.carNames, this.playCount)
    }
  }
}

class Car {
  constructor (names, count) {
    this.$parent = selector('#game-process-component');
    this.names = names
    this.count = count
    this.result = [];

    this.init();
  }

  init() {
   this.makeCarStatus();
  }

  makeCarStatus() {
    const template = this.names.reduce((html, name) => {
      html += TEMPLATE.CAR_STATUS(name)
      return html;
    }, '')
    this.$parent.insertAdjacentHTML('beforeend', TEMPLATE.CAR_BOARD(template))
    this.timer(1000, this.count)
  }

  makeRandomNum () {
    return Math.floor(Math.random() * 10)
  }
  insertMove(id) {
    selector(`div[data-name="${id}"] > div`,this.$parent).insertAdjacentHTML('afterend', TEMPLATE.CAR_MOVE)
  }

  clearSpinner (id) {
    const target = selector(`div[data-name="${id}"]`, this.$parent);
    target.removeChild(target.lastElementChild)
    this.addReselt();
  }

  addReselt() {
    selector('#game-result-component').addEventListener('click', this.restart)
  }

  restart = ({target}) => {
    if(target.classList.contains('restart-racing')){
      publish();
    }
  }
  timer (time = 1000, count = 3) {

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
      this.names.forEach(name => this.clearSpinner(name));
      selector('#game-result-component').innerHTML = TEMPLATE.WINNER(this.names)
      // setTimeout(() => alert('축하애요'), 2000)
      return false
    } else {
      count -= 1
      setTimeout(() => {
        this.names.forEach(name => {
          if ( this.makeRandomNum() > 3) {
            this.insertMove(name)
          }
        })
        this.timer(1000, count)
      }, time)
    }
  }

}

// 어디서 시작할지를 받아서 게임 객체를 만든다.
// 그 타켓을 가지고 경주게임에서 사용할 이름들을 받는다.
// 이름을 받는데 1자 이상 5자 이하이며,
// ,를 기준으로 나누고 확인버튼 누르면
// 이상이 없다면 다음 스텝, 있다면 해당 메세지를 노출시킨다.
// 시도할 횟수를 입력하는 판을 보여준다.
// 레이싱 횟수를 1이상해야지 된다
// 해당 횟수와 이름를 가지고 게임을 시작한다.
// 게임을 시작한다.
// 렌덤으로 숫자를 돌리는데, 4이상이면 전진하고, 그 이하는 다음 턴을 기다린다.

// ????

// 게임이 종료된다.
// -> 결과를 보여준다.
// -> 결과가 보여지고 나서 시스템 alert노출

const game111 = new Game(selector('#app'))
// game.start()
