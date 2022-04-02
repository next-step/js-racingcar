export function carView(name) {
  return String.raw`
    <div data-car-name="${name}" class="mr-2">
      <div class="car-player">${name}</div>
    </div>
  `;
}

export function carNameView() {
  return String.raw`<div class="forward-icon mt-2">⬇️️</div>`;
}
