import App from './view/App.js'
import FormCarNames from './view/formCarNames.js'
import FormAttempts from './view/formAttempts.js'
import Playboard from './view/playboard/index.js'
import Player from './view/playboard/player.js'
import PlayerWaiting from './view/playboard/playerWaiting.js'
import PlayerForward from './view/playboard/playerForward.js'
import Winner from './view/winner.js'
/* 상위->하위 순서로 정의해줘야 제대로 동작함. */

/* depth 0 */
customElements.define('racingcar-app', App)

/* depth 1 */
customElements.define('play-board', Playboard)
customElements.define('form-car-names', FormCarNames)
customElements.define('form-attempts', FormAttempts)
customElements.define('play-winner', Winner)

/* depth 2 */
customElements.define('car-player', Player)
customElements.define('player-waiting', PlayerWaiting)
customElements.define('player-forward', PlayerForward)
