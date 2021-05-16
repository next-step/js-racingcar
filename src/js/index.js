import { selector } from './utils/util.js'
import Game from "./components/Game.js";

window.addEventListener('DOMContentLoaded', _ => {
  new Game(selector('#app'))
})
