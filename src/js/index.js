import { racingCarInputEvent } from './Controller/InputEvent/racingCarInputEvent.js';
import { init } from './Controller/InputEvent/index.js';
import {selector} from './util/consts.js'
import Form from './View/Component/Form/Form.js';
import { render } from './View/index.js';
import { Component } from './View/index.js';


const app = selector('#app');
render(app, Component.create(Form()))

init()


