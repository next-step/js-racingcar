/* eslint-disable no-unused-vars */
import { Controller } from './Controllers/Controller.js';
import { GameModel } from './Models/GameModel.js';
import { View } from './Views/View.js';

const gameModel = new GameModel();
const view = new View({ model: gameModel });
const controller = new Controller({ model: gameModel, view });
