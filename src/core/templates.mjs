export function carListTemplate(names) {
  return `<div class="mt-4 d-flex">
            ${names
              .map(
                (name) =>
                  `<div class="mr-2" aria-label="${name}"><div class="car-player">${name}</div></div>`
              )
              .join("")}
        </div>`;
}

export const forwardIconTemplate = `<div class="forward-icon mt-2">⬇️️</div>`;

export const spinner = `<div class="d-flex justify-center mt-3 spinner-block">
  <div class="relative spinner-container">
    <span class="material spinner"></span>
  </div>
</div>`
