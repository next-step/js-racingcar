import App from './App.js'
import { initStateValue } from './constants.js'
import Store from './core/Store.js'

new App(new Store(), initStateValue)
