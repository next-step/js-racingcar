export function drawCars(names) {
  return `<div class="mt-4 d-flex">
            ${names
              .map(
                (name) =>
                  `<div class="mr-2" aria-label="${name}"><div class="car-player">${name}</div></div>`
              )
              .join("")}
        </div>`;
}

export const forwardIcon = `<div class="forward-icon mt-2">⬇️️</div>`;
