import { RacingFormEvent } from './Controller/Event/event.js';
import {selector} from './util/consts.js'
import Form from './View/Component/Form/Form.js';
import { render } from './View/index.js';
import { Component } from './View/index.js';


const app = selector('#app');
render(app, Component.create(Form()))

const carNameForm = selector('.racing-form');
carNameForm?.addEventListener('submit', RacingFormEvent.carNameHandler)


