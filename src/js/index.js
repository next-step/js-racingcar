import { RacingEvent } from './Controller/Event/event.js';
import {selector} from './util/consts.js'
import Form from './View/Component/Form/Form.js';
import { render } from './View/index.js';
import { Component } from './View/index.js';


const app = selector('#app');
render(app, Component.create(Form()))

const carForm = selector('.racing-form')
carForm.addEventListener('submit', event => event.preventDefault())

const carNameButton = selector('.car-name-button');
carNameButton.addEventListener('click', RacingEvent.carNameClickEvent)

const carNameInput = selector('.car-name-input');
carNameInput.addEventListener('keypress', RacingEvent.carNameKeyboardEvent)

