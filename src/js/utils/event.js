export const KEY_EVENT = {
  KEY_DOWN: "keydown"
}

export const KEY = {
  ENTER: "Enter"
}

export const isEnter = event => event.key === KEY.ENTER;
export const getClassName = event => event.target.className;
export const getId = event => event.target.id;
export const getValue = event => event.target.value;