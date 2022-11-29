export default function printArrow(ele) {
  return ele.parentNode.insertAdjacentHTML('beforeend', `<div class="forward-icon mt-2">⬇️️</div>`);
}