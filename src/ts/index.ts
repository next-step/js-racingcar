import './app.js'

import './view/formCarNames.js'
import './view/formAttempts.js'
import './view/playboard.js'
import './view/winner.js'
import './view/player/index.js'
import './view/player/playerWaiting.js'
import './view/player/playerForward.js'

/*
  store와 view의 결합도를 최소화하기 위해 App에서만 store의 존재를 알게끔 함.
  이에 따라 반드시 App을 가장 먼저 초기화(import)해야 함.
*/

export default {}
