export default function printArrow(ele) {
  return ele.insertAdjacentHTML(
    'afterend',
    `<div class="forward-icon mt-2">⬇️️</div>`
  );
}
