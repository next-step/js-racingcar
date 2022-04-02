import { racingCarInputEvent } from './Controller/InputEvent/racingCarInputEvent.js';
import {selector} from './util/consts.js'
import Form from './View/Component/Form/Form.js';
import { render } from './View/index.js';
import { Component } from './View/index.js';


const app = selector('#app');
render(app, Component.create(Form()))

const carForm = selector('.racing-form')
carForm.addEventListener('submit', event => event.preventDefault())

const carNameButton = selector('.car-name-button');
carNameButton.addEventListener('click', racingCarInputEvent.racingCarNameClickEvent)

const carNameInput = selector('.car-name-input');
carNameInput.addEventListener('keypress', racingCarInputEvent.racingCarNameKeyboardEvent)

const racingCountButton = selector('.racing-count-button');
// racingCountButton.addEventListener('click', )

const racingCountInput = selector('.racing-count-input')
// racingCountInput.addEventListener('keypress', )
