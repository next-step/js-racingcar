export default class DomUtil {
  static render(element, template) {
    document.querySelector(element).innerHTML = template;
  }

  static insertHTML(element, template, position = 'beforeend') {
    console.log(document.querySelector(element), template);
    document.querySelector(element).insertAdjacentHTML(position, template);
  }

  static removeHTML(element) {
    document.querySelector(element).remove();
  }

  static show(element) {
    document.querySelector(element).style.display = 'block';
  }

  static hide(element) {
    document.querySelector(element).style.display = 'none';
  }

  static getChildCount(element) {
    return document.querySelector(element).childElementCount;
  }
}
