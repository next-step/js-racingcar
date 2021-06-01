export const KEY_EVENT = {
  KEY_DOWN: "keydown"
}

export const KEY = {
  ENTER: "Enter"
}

export const CLICK_EVENT = {
  CLICK: "click"
}

export const isEnter = event => event.key === KEY.ENTER;
export const isButton = event => event.target.type === "button";
export const getClassName = event => event.target.className;
export const getId = event => event.target.id;
export const getValue = event => event.target.value;

export const reStart = () => window.location.reload();
export const alertWinner = winners => alert(winners+"님이 우승하셨습니다!");
export const SECOND = 1000;
export const ALERT_TIME = 2;

